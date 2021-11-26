import React, { useState } from 'react';
import IDocument from '../../models/Document';
import DocumentCategory from '../../models/DocumentCategory';
import {
  TAutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';

export default function useGallery() {
  const [imageWidth, setImageWidth] = useState('100%');
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedItems, setSelectedItems] = useState<boolean[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Array<IDocument>>([])
  const [autocompleteItems, setAutocompleteItems] = useState<Array<TAutocompleteDropdownItem>>([])

  const setIsSelected = (index: number) => {
    if(!selectedItems[index]) {
      const newSelectedItems = [...selectedItems]
      newSelectedItems[index] = true
      setSelectedItems(newSelectedItems)
    } else {
      const newSelectedItems = [...selectedItems]
      newSelectedItems[index] = false
      setSelectedItems(newSelectedItems)
    }
  }

  const documentAutocompleteString = (doc: IDocument) => {
    return `${doc.name}
${doc.date.toLocaleDateString()}
${doc.category}`;
  };
  const buildAutocompleteItems = (documents: Array<IDocument>) => {
    setAutocompleteItems(!documents || documents.length == 0
      ? []
      : documents.map((doc: IDocument) => ({
          id: doc.id!,
          title: documentAutocompleteString(doc),
        }))
    );
  };

  const documentIncludes = (document: IDocument, value: any): boolean => {
    // TODO: Should search for user and community too? => other versions could include
    // retrieving a list of DTOs with:
    // - communities name and address whose logged user are registered to
    // - users of same community as the logged user
    // All depending of the user's role
    return document.date.toLocaleString().includes(value) ||
      Object.values(DocumentCategory).some((enumValue) => enumValue.includes(value)) ||
      document.name.includes(value) ||
      document.comments.includes(value);
  }
  const filterDocuments = (documents: Array<IDocument>, search: string, isId: boolean = false) => {
    if(search.length == 0)
      setFilteredDocuments(documents)
    else {
      const docs = [...documents]
      if(!isId)
        setFilteredDocuments(docs.filter((doc) => documentIncludes(doc, search)))
      else
        setFilteredDocuments(docs.filter((doc) => doc.id && doc.id === search))
    }
  }

  return {
    imageWidth,
    setImageWidth,
    isSelecting,
    setIsSelecting,
    selectedItems,
    setIsSelected,
    buildAutocompleteItems,
    autocompleteItems,
    filteredDocuments,
    filterDocuments
  }
}