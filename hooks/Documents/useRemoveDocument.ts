import { useMutation, useQueryClient } from 'react-query';
import IDocument from '../../models/Document';
import { removeDocumentById, RequestResult } from '../../services/api';

export default function useRemoveDocument() {
  const removeDocument = async (data: IDocument): Promise<RequestResult> => {
    const response = await removeDocumentById(data);
    // TODO: This return false if something goes wrong, check and show errors
  };

  const queryClient = useQueryClient();
  return useMutation('removeDoc', removeDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries('userDocs');
      queryClient.invalidateQueries('commDocs');
      return queryClient.invalidateQueries('removeDoc');
    },
  });
}
