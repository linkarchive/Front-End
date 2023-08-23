import LinkItem, { LinkItemWithProfile, LinkItemListProps } from '@/components/LinkItem';
import { DeleteButton } from '@/components/LinkItem/Button/DeleteButton';
import React, { useEffect } from 'react';
import LinkItemListLayout from '@/layouts/LinkItemLayout';
import Suggestion from '../Home/Suggestion/Suggestion';
import { useAppDispatch } from '@/store';
import { setLinkCount, setMarkCount } from '@/store/slices/countSlice';

interface LinkItemListRendererProps extends LinkItemListProps {
  ItemComponent: React.ComponentType;
  showDelete?: boolean;
}

const LinkItemListRenderer = ({
  data,
  queryKey,
  ItemComponent,
  showDelete,
}: LinkItemListRendererProps) => {
  const dispatch = useAppDispatch();

  const isEmpty =
    data[0]?.linkArchive?.length <= 0 ||
    data[0]?.linkList?.length <= 0 ||
    data[0]?.markList?.length <= 0 ||
    (showDelete && data[0]?.trashLinkList?.length <= 0);

  const linkItems = data.flatMap((data_) => {
    const linkList =
      data_.linkList || data_.linkArchive || data_.markList || (showDelete && data_.trashLinkList);

    return linkList.map((linkItem) => ({
      key: linkItem.linkId,
      queryKey,
      ...linkItem,
    }));
  });

  // 링크 수 계산 후 dispatch
  useEffect(() => {
    const totalLinkCount = data.reduce((acc, curr) => acc + (curr.linkList?.length || 0), 0);
    dispatch(setLinkCount(totalLinkCount));
  }, [data, dispatch]);

  // 마크 수 계산 후 dispatch
  useEffect(() => {
    const totalMarkCount = data.reduce((acc, curr) => acc + (curr.markList?.length || 0), 0);
    dispatch(setMarkCount(totalMarkCount));
  }, [data, dispatch]);

  return (
    <LinkItemListLayout>
      {isEmpty ? (
        <Suggestion />
      ) : (
        <>
          {linkItems.map((item) => (
            <>
              <ItemComponent {...item} />
              {showDelete && <DeleteButton id={item.key} queryKey={item.queryKey} />}
            </>
          ))}
        </>
      )}
    </LinkItemListLayout>
  );
};

const LinkItemList = (props: LinkItemListProps) => (
  <LinkItemListRenderer {...props} ItemComponent={LinkItem} showDelete /> // 휴지통에서의 삭제는 어떻게 할지 모르겠음
);
const LinkItemWithProfileList = (props: LinkItemListProps) => (
  <LinkItemListRenderer {...props} ItemComponent={LinkItemWithProfile} showDelete />
);
const HomeLinkItemList = (props: LinkItemListProps) => (
  <LinkItemListRenderer {...props} ItemComponent={LinkItem} showDelete />
);

export { LinkItemList, LinkItemWithProfileList, HomeLinkItemList };
