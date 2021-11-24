import React, { useState } from 'react';

export default function useGallery() {
  const [imageWidth, setImageWidth] = useState('100%');
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const setIsSelected = (index: number) => {
    if(!selectedItems.includes(index)) {
      const newSelectedItems = [...selectedItems]
      newSelectedItems.push(index)
      setSelectedItems(newSelectedItems)
    }      
  }

  return {
    imageWidth,
    setImageWidth,
    isSelecting,
    setIsSelecting,
    selectedItems,
    setIsSelected
  }
}