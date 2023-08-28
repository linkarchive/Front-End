import styled from 'styled-components';

const LinkItem = styled.div`
  width: 343px;
  min-width: 343px;
  max-width: 343px;
  margin: 0 auto;
`;

const InfoWrapper = styled(LinkItem)`
  display: flex;
  flex-direction: row;
`;

const Header = styled(InfoWrapper)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22.5px;
`;

// FIXME css 린트 에러 방지를 위해 삽입
const BottomBlock = styled(LinkItem)`
  width: 343px;
`;

const HashTagBlock = styled(LinkItem)`
  margin-bottom: 16px;
`;

const BorderBottom = styled(LinkItem)`
  border-bottom: 1px solid #f5f5f5;
`;

const LinkInfoBlock = styled.div`
  margin-bottom: 27px;
`;

export { InfoWrapper, Header, BottomBlock, HashTagBlock, BorderBottom, LinkInfoBlock };
