import LinkItem, { LinkItemWithProfile, LinkItemListProps } from '@/components/LinkItem';
import React from 'react';
import styled from 'styled-components';

const LinkItemList = ({ linkInfoList, queryKey }: LinkItemListProps) => {
  const isEmpty = linkInfoList.some(
    (info) => !(info?.linkList?.length || info?.linkArchive?.length || info?.markList?.length)
  );

  if (isEmpty) {
    return <Block>링크가 없습니다.</Block>;
  }

  return (
    <>
      {linkInfoList
        .map((linkInfo) => {
          const linkList = linkInfo?.linkList || linkInfo?.linkArchive || linkInfo?.markList;

          return linkList?.map((linkItem) => (
            <LinkItem key={`${linkItem.linkId}`} queryKey={queryKey} {...linkItem} />
          ));
        })
        .flat()}
    </>
  );
};

const LinkItemWithProfileList = ({ linkInfoList, queryKey }: LinkItemListProps) => {
  const isEmpty = linkInfoList.some(
    (info) => !(info?.linkList?.length || info?.linkArchive?.length || info?.markList?.length)
  );

  if (isEmpty) {
    return <Block>링크가 없습니다.</Block>;
  }

  return (
    <>
      {linkInfoList
        .map((linkInfo) => {
          const linkList = linkInfo?.linkList || linkInfo?.linkArchive || linkInfo?.markList;

          return linkList?.map((linkItem) => (
            <LinkItemWithProfile key={`${linkItem.linkId}`} queryKey={queryKey} {...linkItem} />
          ));
        })
        .flat()}
    </>
  );
};

export { LinkItemList, LinkItemWithProfileList };

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

/** 
 // TODO HOC 개선 
import { ComponentType } from 'react';

interface LinkItemProps {
  [key: string]: string;
}
interface LinkItemListProps {
  linkList: LinkItemProps[];
}

const withLinkItemList = <P extends object>(
  WrappedComponent: ComponentType<P & LinkItemListProps>
): React.FC<LinkItemListProps & P> => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any, react/prop-types
  return ({ linkList, ...props }) => {
    return (
      <>
        {linkList.map((linkItem, idx) => (
          <WrappedComponent {...linkItem} {...props} key={idx} />
        ))}
      </>
    );
  };
};

export default withLinkItemList;
*/
