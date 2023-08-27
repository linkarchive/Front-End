import { EmptyIcon } from '@/components/svg/Svg';
import { RootState } from '@/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SpeechBubbles from '../SpeechBubbles/SpeechBubbles';

const Suggestion = () => {
  const { myLink } = useSelector((state: RootState) => state.nav);
  const { linkCount } = useSelector((state: RootState) => state.count);

  return (
    <Container>
      <Wrapper>
        <IconBox>
          <EmptyIcon />
        </IconBox>
        {myLink ? (
          <TextBox>
            아직 저장된 링크가 없어요.
            <br />
            저장하고 싶은 링크를 올려보세요!
          </TextBox>
        ) : (
          <>
            <TextBox>
              아직 다시 보고 싶은 링크가 없어요.
              <br />
              저장하고 싶은 링크를 마크해보세요!
            </TextBox>
            <Link href='/archive'>
              <Button type='button' value='링크 둘러보기' />
            </Link>
          </>
        )}
      </Wrapper>

      {myLink && linkCount === 0 && (
        <Content>
          <SpeechBubbles title='링크 추가하기' />
        </Content>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 91px - 60px - 91px);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 400px;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-155px, -30px);
`;

const IconBox = styled.div`
  margin-bottom: 20px;
`;

const TextBox = styled.p`
  margin-bottom: 20px;

  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 20.8px;
  color: ${({ theme }) => theme.gray.lightGray};
`;

const Button = styled.input`
  width: 109px;
  height: 34px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.gray.lighterGray};
  border-radius: 20px;

  color: ${({ theme }) => theme.gray.lightGray};
  gap: 8px;
  cursor: pointer;
`;

export default Suggestion;
