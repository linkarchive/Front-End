import API from '@/api/API';
import { useQuery } from '@tanstack/react-query';

export const useFetchTagsByUserId = ({ userId }: { userId: number }) =>
  useQuery({
    queryKey: [userId, 'tagList'],
    queryFn: () => API.getTagsByUserId({ userId }),
    retry: 1,
  });

// size를 params로 받는건 어떤지??
