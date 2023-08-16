import styled from 'styled-components';
import {
  BottomBlock,
  Header,
  HashTagBlock,
  BorderBottom,
  LinkInfoBlock,
} from '@/components/LinkItem/LinkItem/LinkItem.styled';

const Wrapper = styled.article`
  padding-top: 24px;
`;

const LinkItemMain = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const LinkItemInfo = Object.assign(LinkItemMain, {
  Header,
  HashTagBlock,
  LinkInfoBlock,
  Bottom: BottomBlock,
  BorderBottom,
});

export default LinkItemInfo;
