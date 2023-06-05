import API from '@/api/API';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';

export const useToggleMark = ({
  linkId,
  isMark,
  queryKey,
}: {
  linkId: number;
  isMark: boolean;
  queryKey: QueryKey;
}) => {
  const queryClient = useQueryClient();

  const { isLoggedin } = useAuth();

  const markMutation = useMutation({
    mutationFn: isMark ? API.deleteMark : API.createMark,
    onMutate: (value) => {
      const prevLinkList = queryClient.getQueryData(queryKey);
      const updateLinkList = updateLinkItem({ linkList: prevLinkList, key: '', linkId: value });
      queryClient.setQueryData(queryKey, updateLinkList);
      return { prevLinkList };
    },
    onError: ({ context }) => {
      queryClient.setQueryData(queryKey, context.prevLinkList);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleToggleMark = () => {
    if (!isLoggedin) return; // 비로그인 상태시 동작 x
    if (markMutation.isLoading) return;

    markMutation.mutate(linkId);
  };

  return { handleToggleMark };
};

/**
 * linkItem의 isMark와 bookMarkCount 상태 업데이트
 */
function updateLinkItem({
  linkList,
  key: key_,
  linkId,
}: {
  linkList: unknown;
  key?: string;
  linkId: number;
}) {
  const keys = ['linkArchive', 'linkList', 'markList']; // TODO key를 인자로 받도록 하드코딩 개선

  const list = JSON.parse(JSON.stringify(linkList));
  list.pages.forEach((page) => {
    keys.forEach((key) => {
      if (page[key]) {
        page[key] = page[key].map((link) => {
          if (link.linkId === linkId) {
            link.isMark = !link.isMark;
            link.bookMarkCount += link.isMark ? 1 : -1;
          }
          return link;
        });
      }
    });
  });

  return list;
}
