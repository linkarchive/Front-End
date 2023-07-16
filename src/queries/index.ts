import API from '@/api/API';
import { useQuery } from '@tanstack/react-query';

export const useFetchTagsByNickname = ({
  nickname: usernickname,
  size = 10,
}: {
  nickname: string;
  size?: number;
}) =>
  useQuery({
    queryKey: [usernickname, 'tagList', size],
    queryFn: () => API.getTagsByNickname({ usernickname, size: 10 }),
    retry: 1,
  });
