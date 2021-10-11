import { useState } from "react";
import Document from "../models/Document";
import DocumentCategory from "../models/DocumentCategory";

export default function useUserNewDocument() {
  const [document, setDocument] = useState<Document>({
    uri: "",
    contentType: "",
    community: "",
    user: "",
    date: new Date(),
    category: DocumentCategory.Others,
    name: "",
    comments: "",
  });
  const [isDocumentLoading, setIsDocumentLoading] = useState<boolean>(true);

  const getMimeType = (ext: string): string => {
    // mime type mapping
    switch (ext) {
      case "pdf":
        return "application/pdf";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "gif":
        return "image/gif";
      case "tif":
      case "tiff":
        return "image/tiff";
      // case "png":
      default:
        return "image/png";
    }
  };
  const getExtension = (): string => {
    switch (document.contentType) {
      case "application/pdf":
        return "pdf";
      case "image/jpeg":
        return "jpg";
      case "image/gif":
        return "gif";
      case "image/tiff":
        return "tif";
      // case "image/png":
      default:
        return "png";
    }
  };

  const setNewDocumentFile = (uri: string, name: string | undefined) => {
    console.log("URI: ", uri);
    setIsDocumentLoading(true);

    const uriExtensionArray = /\.(\w+)$/.exec(uri);
    console.log("uriExtensionArray: ", uriExtensionArray);
    if (!uriExtensionArray) {
      // TODO: error in case no extension
      alert("The file has no extension");
      return;
    }

    const type = getMimeType(uriExtensionArray[1]);
    const now = new Date();

    // Depending on the file, it could provide a name or not, if no name,
    // is provided, simply use now date and the extension built
    // from the uri
    const fileName =
      name && name.length > 0
        ? name
        : `${now.toString()}.${uriExtensionArray[1]}`;

    const newDocument: Document = {
      ...document,
      uri,
      contentType: type,
      name: document.name === "" ? fileName : document.name,
    };

    setDocument(newDocument);
    setIsDocumentLoading(false);
  };

  const fillDocumentForm = ({
    name,
    category,
    comments,
  }: {
    name: string;
    category: string;
    comments: string;
  }) => {
    let fileName = name;
    const defaultExtension = getExtension();
    const extension = /\.(\w+)$/.exec(name);
    if (!extension) {
      fileName = `${fileName}.${defaultExtension}`;
    }

    const newDocument: Document = {
      ...document,
      name: fileName,
      category: category as DocumentCategory,
      comments,
    };

    setDocument(newDocument);
  };

  return {
    document,
    isDocumentLoading,
    setNewDocumentFile,
    fillDocumentForm,
  };
}
