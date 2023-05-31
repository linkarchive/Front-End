import LinkItem, { LinkItemWithProfile, ILinkItem } from '@/components/LinkItem';
import styled from 'styled-components';

interface IData {
  data: {
    linkList?: ILinkItem[];
    linkArchive?: ILinkItem[];
  };
}

const LinkItemList = ({ data }: { data: IData[] }) => {
  return (
    <>
      {(data[0]?.data?.linkArchive?.length <= 0 || data[0]?.data?.linkList?.length <= 0) && (
        <Block>링크가 없습니다.</Block>
      )}

      {data.length > 0 &&
        data.map(({ data: data_ }) => {
          const linkList = data_.linkList || data_.linkArchive;

          return (
            <>
              {linkList.map((linkItem) => (
                <LinkItem key={linkItem.linkId} {...linkItem} />
              ))}
            </>
          );
        })}
    </>
  );
};

const LinkItemWithProfileList = ({ data }: { data: IData[] }) => {
  return (
    <>
      {(data[0]?.data?.linkArchive?.length <= 0 || data[0]?.data?.linkList?.length <= 0) && (
        <Block>링크가 없습니다.</Block>
      )}
      {data.length > 0 &&
        data.map(({ data: { linkArchive } }) => (
          <>
            {linkArchive.map((linkItem) => (
              <LinkItemWithProfile key={linkItem.linkId} {...linkItem} />
            ))}
          </>
        ))}
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
