import { useMutation, useQueryClient } from "react-query";
import IDocument from "../../models/Document";
import { getUserDocuments } from "../../services/api";

export default function useUserDocuments() {
  const getDocuments = async (data: Promise<IDocument>) => {
  }

  const queryClient = useQueryClient();
  return useMutation("galleryDocs", getDocuments, {
    onSuccess: () => {
      return queryClient.invalidateQueries("galleryDocs");
    },
  });
}