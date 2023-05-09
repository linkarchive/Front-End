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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  > button {
    cursor: pointer;
  }
`;

export default KaKao;
