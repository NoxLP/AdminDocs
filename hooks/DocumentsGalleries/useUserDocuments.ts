import { useQuery } from 'react-query';
import IDocument from '../../models/Document';
import { getUserDocuments } from '../../services/api';

export default function useUserDocuments() {
  const getDocuments = async () => {
    const response = await getUserDocuments();

    if (response.correct) {
      // TODO: This return false if something goes wrong, check and show errors
      console.log('>>> ');
      return response.data;
    }

    return [];
  };
  const {
    isLoading,
    error,
    isError,
    data: documents,
  } = useQuery<Array<IDocument>, Error>('userDocs', getDocuments);

  return { isLoading, error, isError, documents };
}
