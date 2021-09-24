import { useState } from "react";
import { getInfoAsync } from "expo-file-system";
import Document from "../models/Document";
import DocumentCategory from "../models/DocumentCategory";

export default function useUserNewDocument(): Array<any> {
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
  const setNewDocumentAsync = async (uri: string) => {
    const fileInfo = await getInfoAsync(uri);

    const filename = fileInfo.uri.split("/").pop()!;
    const extArr = /\.(\w+)$/.exec(filename);
    if (!extArr) {
      // TODO: error in case no extension
      alert("The file has no extension");
      return;
    }
    const type = getMimeType(extArr[1]);

    // Partial document to be finished later in a form by the user
    const document: Document = {
      uri,
      contentType: type,
      community: "",
      user: "",
      date: new Date(),
      category: DocumentCategory.Others,
      name: filename,
      comments: "",
    };
    setDocument(document);
  };

  return [document, setNewDocumentAsync];
}
