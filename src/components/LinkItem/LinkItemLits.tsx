import LinkItem, { LinkItemWithProfile, ILinkItem } from '@/components/LinkItem';

interface IData {
  data: {
    linkList?: ILinkItem[];
    linkArchive?: ILinkItem[];
  };
}

const LinkItemList = ({ data }: { data: IData[] }) => {
  return (
    <>
      {data.length <= 0 && <div>데이터가 없습니다.</div>}
      {data.length > 0 &&
        data.map(({ data: { linkList: linkArchive } }) => (
          <>
            {linkArchive.map((linkItem) => (
              <LinkItem key={linkItem.linkId} {...linkItem} />
            ))}
          </>
        ))}
    </>
  );
};

const LinkItemWithProfileList = ({ data }: { data: IData[] }) => {
  return (
    <>
      {data.length <= 0 && <div>데이터가 없습니다.</div>}
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
