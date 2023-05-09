import KakaoBtn from '@/components/KaKaoBtn';
import styled from 'styled-components';

const KaKao = () => {
  return (
    <Wrapper>
      <h2>로그인 해주세요.</h2>
      <KakaoBtn />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  inset: 0;

  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  > button {
    cursor: pointer;
  }
`;

export default KaKao;
