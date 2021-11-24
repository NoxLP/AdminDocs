import React, { useState } from 'react';

export default function useGallery() {
  const [imageWidth, setImageWidth] = useState('100%');
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedItems, setSelectedItems] = useState<boolean[]>([])

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

  return {
    imageWidth,
    setImageWidth,
    isSelecting,
    setIsSelecting,
    selectedItems,
    setIsSelected
  }
}