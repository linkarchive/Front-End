import { SpeechBubblesIcon } from '@/components/svg/Svg';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface PopUpProps {
  title: string;
}

const SpeechBubbles = ({ title }: PopUpProps) => {
  return (
    <Container>
      <Wrapper>
        <Link href='/create'>
          <SpeechBubblesIcon />
          <Content>{title}</Content>
        </Link>
      </Wrapper>
    </Container>
  );
};

const Container = styled.span`
  position: absolute;
`;

const Wrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  cursor: pointer;
`;

const Content = styled.span`
  position: absolute;
  top: 13px;
  left: 37px;

  color: #fff;
  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
`;

export default SpeechBubbles;
