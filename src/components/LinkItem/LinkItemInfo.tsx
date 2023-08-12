import styled from 'styled-components';
import { BottomBlock, InfoWrapper } from '@/components/LinkItem/LinkItem.styled';

const Wrapper = styled.article`
  padding: 24px 0 24px;
`;

const Header = styled(InfoWrapper)`
  display: flex;
  gap: 8px;

  margin-bottom: 22.5px;
`;

const LinkItemMain = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const LinkItemInfo = Object.assign(LinkItemMain, {
  LinkItemHeader: Header,
  LinkItemBottom: BottomBlock,
});

export default LinkItemInfo;
