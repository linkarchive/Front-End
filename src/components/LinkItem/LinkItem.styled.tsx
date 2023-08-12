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

  /* min-height: 84px; */
  /* gap: 16px; */
`;

const UtilsWrapper = styled(LinkItem)``;

const BottomBlock = styled(LinkItem)``;

export { InfoWrapper, UtilsWrapper, BottomBlock };
