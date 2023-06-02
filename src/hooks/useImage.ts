import API from '@/api/API';
import { useState, ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';

export const useImage = (initialImageUrl: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);

  const uploadImageMutation = useMutation({ mutationFn: API.uploadImage });

  const onImageChange = (e: ChangeEvent<HTMLInputElement>, accessToken) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    uploadImageMutation.mutate(
      { accessToken, file },
      {
        onSuccess: (response) => {
          setImageUrl(response.data.profileImageFileName);
        },
        onError: () => {
          console.error('이미지 업로드에 실패했습니다.');
        },
      }
    );
  };

  return { imageUrl, setImageUrl, onImageChange };
};
