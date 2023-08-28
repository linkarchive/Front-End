import styled from 'styled-components';

interface BottomButtonProps {
  text: string;
  isAbled: boolean;
}

const BottomButton = ({ text, isAbled }: BottomButtonProps) => {
  return (
    <Container>
      <Wrapper disabled={!isAbled}>{text}</Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: -52px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.button`
  width: 343px;
  height: 56px;

  background: ${({ theme }) => theme.primary.main};
  border: none;
  border-radius: 10px;
  gap: 8px;

  color: ${({ theme }) => theme.common.white};
  cursor: pointer;

  &:disabled {
    background: ${({ theme }) => theme.warning.dark};
    cursor: not-allowed;
  }
`;

export default BottomButton;
