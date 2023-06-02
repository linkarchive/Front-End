import { LinkItemWithProfile, LinkItemListProps } from '@/components/LinkItem';
import React from 'react';
import styled from 'styled-components';

const LinkItemList = ({ data }: LinkItemListProps) => {
  const isEmpty =
    data[0]?.linkArchive?.length <= 0 ||
    data[0]?.linkList?.length <= 0 ||
    data[0]?.markList?.length <= 0;

  if (isEmpty) {
    return <Block>링크가 없습니다.</Block>;
  }

  return (
    <>
      {data.map((data_) => {
        const linkList = data_.linkList || data_.linkArchive || data_.markList;

        return (
          <>
            {linkList.map((linkItem) => (
              <LinkItemWithProfile key={linkItem.linkId} {...linkItem} />
            ))}
          </>
        );
      })}
    </>
  );
};

const LinkItemWithProfileList = ({ data }: LinkItemListProps) => {
  const isEmpty =
    data[0]?.linkArchive?.length <= 0 ||
    data[0]?.linkList?.length <= 0 ||
    data[0]?.markList?.length <= 0;

  if (isEmpty) {
    return <Block>링크가 없습니다.</Block>;
  }
  return (
    <>
      {data.map((data_) => {
        const linkList = data_.linkList || data_.linkArchive || data_.markList;

        return (
          <>
            {linkList.map((linkItem) => (
              <LinkItemWithProfile key={linkItem.linkId} {...linkItem} />
            ))}
          </>
        );
      })}
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
