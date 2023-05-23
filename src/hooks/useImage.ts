import API from '@/api/API';
import { useState, ChangeEvent } from 'react';

export const useImage = (initialImage: string) => {
  const [image, setImage] = useState<string>(initialImage);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      // type narrowing으로 타입 에러 방지
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }

      const response = await API.uploadImage(file);
      setImageUrl(response.data.url);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage(initialImage);
    }
  };

  const updateImage = (newImage: string) => {
    setImage(newImage);
  };

  return { image, imageUrl, onImageChange, updateImage };
};
