import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { PickerItemProps } from '../../components/Picker/PickerProps';
import IDocument from '../../models/Document';
import DocumentCategory from '../../models/DocumentCategory';
import { addDocument } from '../../services/api';

export default function useUserNewDocument() {
  const [document, setDocument] = useState<IDocument>({
    uri: '',
    contentType: '',
    community: '',
    user: '',
    date: new Date(),
    category: 'Others' as DocumentCategory,
    name: '',
    comments: '',
  });
  const [isDocumentLoading, setIsDocumentLoading] = useState<boolean>(true);
  const [isDocumentFilled, setIsDocumentFilled] = useState<boolean>(false);

  const getMimeType = (ext: string): string => {
    // mime type mapping
    switch (ext) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'gif':
        return 'image/gif';
      case 'tif':
      case 'tiff':
        return 'image/tiff';
      // case "png":
      default:
        return 'image/png';
    }
  };
  const getExtension = (): string => {
    switch (document.contentType) {
      case 'application/pdf':
        return 'pdf';
      case 'image/jpeg':
        return 'jpg';
      case 'image/gif':
        return 'gif';
      case 'image/tiff':
        return 'tif';
      // case "image/png":
      default:
        return 'png';
    }
  };

  const getDocumentName = (uri: string, name: string | undefined) => {
    console.log('URI: ', uri);
    setIsDocumentLoading(true);

    const uriExtensionArray = /\.(\w+)$/.exec(uri);
    console.log('uriExtensionArray: ', uriExtensionArray);
    if (!uriExtensionArray) {
      // TODO: error in case no extension
      alert('The file has no extension');
      return;
    }

    const type = getMimeType(uriExtensionArray[1]);
    const now = new Date();

    // Depending on the file, it could provide a name or not, if no name,
    // is provided, simply use now date and the extension built
    // from the uri
    const fileName =
      document.name === ''
        ? name && name.length > 0
          ? name
          : `${now.toString()}.${uriExtensionArray[1]}`
        : document.name;

    return { fileName, type };
  };

  const setNewDocumentFile = (uri: string, name: string, type: string) => {
    const newDocument: IDocument = {
      ...document,
      uri,
      contentType: type,
      name: name,
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

    const newDocument: IDocument = {
      ...document,
      name: fileName,
      category: category as DocumentCategory,
      comments,
    };
    console.log('CATEGORY: ' + category);
    console.log('FILL: ' + JSON.stringify(newDocument, null, 4));

    setIsDocumentFilled(true);
    setDocument(newDocument);
  };

  const queryClient = useQueryClient();
  const saveDocument = async () => {
    console.log('SAVE: ' + JSON.stringify(document, null, 4));
    const response = await addDocument(document);
    if (response.correct) {
      queryClient.invalidateQueries('userDocs');
      queryClient.invalidateQueries('commDocs');
    }
  };

  return {
    document,
    isDocumentLoading,
    getDocumentName,
    setNewDocumentFile,
    fillDocumentForm,
    saveDocument,
    isDocumentFilled,
  };
}
