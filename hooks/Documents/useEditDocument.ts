import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import IDocument from '../../models/Document';
import { editDocumentById, RequestResult } from '../../services/api';
import { FormFields } from './useFormValidation';

export default function useEditDocument() {
  const [document, setDocument] = useState<IDocument>();

  const editDocument = async (data: FormFields): Promise<RequestResult> => {
    const response = await editDocumentById({
      ...document,
      category: data.category,
      name: data.name,
      comments: data.comments,
    });

    return response;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation('editDocument', editDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries('userDocs');
      queryClient.invalidateQueries('commDocs');
      return queryClient.invalidateQueries('editDocument');
    },
  });

  return { document, setDocument, mutation };
}
