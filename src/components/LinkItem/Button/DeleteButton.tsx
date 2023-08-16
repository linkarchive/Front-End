import API from '@/api/API';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

export const DeleteButton = ({ id, queryKey }: { id: number; queryKey: QueryKey }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteLinkTemp, isLoading } = useMutation(API.deleteLinkTemp, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const handleDelete = () => {
    if (isLoading) return;
    deleteLinkTemp(id);
  };

  return (
    <button type='button' onClick={handleDelete}>
      삭제
    </button>
  );
};
