import { useState } from "react";
import Document from "../models/Document";
import DocumentCategory from "../models/DocumentCategory";

export default function useUserNewDocument() {
  const [document, setDocument] = useState<Document>();

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
  const setNewDocumentAsync = async ({
    uri,
    name,
  }: {
    uri: string;
    name: string;
  }) => {
    console.log("URI: ", uri);

    const extArr = /\.(\w+)$/.exec(uri);
    console.log("extArr: ", extArr);
    if (!extArr) {
      // TODO: error in case no extension
      alert("The file has no extension");
      return;
    }

    const type = getMimeType(extArr[1]);
    const now = new Date();
    const fileName =
      name && name.length > 0 ? name : `${now.toString()}.${extArr[1]}`;

    // Partial document to be finished later in a form by the user
    const document: Document = {
      uri,
      contentType: type,
      community: "",
      user: "",
      date: now,
      category: DocumentCategory.Others,
      name: fileName,
      comments: "",
    };

    setDocument(document);
  };

  return { document, setNewDocumentAsync };
}
