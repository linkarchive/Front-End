import HashTagList from '@/components/HashTag/ReadOnly/HashTagList';
import { ReactElement } from 'react';

type LinkItemListLayoutProps = {
  children: ReactElement;
};

const LinkItemListLayout = ({ children }: LinkItemListLayoutProps) => {
  return <HashTagList>{children}</HashTagList>;
};

export default LinkItemListLayout;
