import { useQuery } from 'react-query';
import IDocument from '../../models/Document';
import { getCommunityDocuments } from '../../services/api';

export default function useUserDocuments() {
  const getDocuments = async () => {
    const response = await getCommunityDocuments();

    if (response.correct) {
      // TODO: This return false if something goes wrong, check and show errors
      return response.data;
    }

    return [];
  };

  const {
    isLoading,
    error,
    isError,
    data: documents,
  } = useQuery<Array<IDocument>, Error>('commDocs', getDocuments);

  return { isLoading, error, isError, documents };
}
