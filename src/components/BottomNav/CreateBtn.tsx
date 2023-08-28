import Link from 'next/link';
import styled from 'styled-components';
import { zIndex } from '@/constants/zIndex';
import { PlusSvg } from '../svg/Svg';

const CreateBtn = () => {
  return (
    <Wrapper>
      <Link href='/create'>
        <StyledButton>
          <PlusSvg color='#ffffff' />
        </StyledButton>
      </Link>
    </Wrapper>
  );
};

export default CreateBtn;

const Wrapper = styled.div`
  position: relative;
  z-index: ${zIndex.CreateBtn};
  transform: translate(-9px, -18px);
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;
  border-radius: 100%;

  background: ${({ theme }) => theme.primary.main};

  > svg {
    width: 24px;
    height: 24px;
  }
`;
