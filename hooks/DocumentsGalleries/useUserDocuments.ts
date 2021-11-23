import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import IDocument from "../../models/Document";
import { getUserDocuments } from "../../services/api";

export default function useUserDocuments() {
  const [documents, setDocuments] = useState<Array<IDocument>>()
  const getDocuments = async () => {
    const response = await getUserDocuments();

    if (response.correct) {
      // TODO: This return false if something goes wrong, check and show errors
      console.log('>>> ');
      setDocuments(response.data);
    } else 
      setDocuments([]);
  }

  return { getDocuments, documents }
}