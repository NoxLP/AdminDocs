import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormFields } from '../../hooks/Documents/useFormValidation';
import IDocument from '../../models/Document';
import { RootStackParamList } from '../../types';

export interface NewDocumentFormPropsOptions {
  type: 'newDoc';
  fillDocumentForm: ({
    name,
    category,
    comments,
  }: {
    name: string;
    category: string;
    comments: string;
  }) => void;
  getDocumentName: (
    uri: string,
    name: string | undefined
  ) =>
    | {
        fileName: string;
        type: string;
      }
    | undefined;
  setNewDocumentFile: (uri: string, name: string, type: string) => void;
  uri: any;
  name: any;
}
export interface EditDocumentFormPropsOptions {
  type: 'editDoc';
}

export default interface DocumentFormProps {
  document: IDocument;
  onSubmit: (data: FormFields) => Promise<void>;
  cancelButtonOnPress: () => void;
  options: NewDocumentFormPropsOptions | EditDocumentFormPropsOptions;
}
