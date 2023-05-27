import LinkItem, { LinkItemWithProfile, ILinkItem } from '@/components/LinkItem';

const LinkItemList = ({ linkList }: { linkList: ILinkItem[] }) => {
  return (
    <>
      {linkList.map((linkItem, idx) => (
        <LinkItem key={idx} {...linkItem} />
      ))}
    </>
  );
};

const LinkItemWithProfileList = ({ linkList }: { linkList: ILinkItem[] }) => {
  return (
    <>
      {linkList.map((linkItem, idx) => (
        <LinkItemWithProfile key={idx} {...linkItem} />
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
