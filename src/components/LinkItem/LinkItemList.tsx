import LinkItem, { LinkItemWithProfile, LinkItemListProps } from '@/components/LinkItem';
import React from 'react';
import styled from 'styled-components';
import { DeleteButton } from './DeleteButton';
import LinkItemListLayout from '@/layouts/LinkItemLayout';

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

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
  const isEmpty =
    data[0]?.linkArchive?.length <= 0 ||
    data[0]?.linkList?.length <= 0 ||
    data[0]?.markList?.length <= 0 ||
    (showDelete && data[0]?.trashLinkList?.length <= 0);

  if (isEmpty) {
    return <Block>링크가 없습니다.</Block>;
  }

  const linkItems = data.flatMap((data_) => {
    const linkList =
      data_.linkList || data_.linkArchive || data_.markList || (showDelete && data_.trashLinkList);

    return linkList.map((linkItem) => ({
      key: linkItem.linkId,
      queryKey,
      ...linkItem,
    }));
  });

  return (
    <LinkItemListLayout>
      <>
        {linkItems.map((item) => (
          <>
            <ItemComponent {...item} />
            {showDelete && <DeleteButton id={item.key} queryKey={item.queryKey} />}
          </>
        ))}
      </>
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
