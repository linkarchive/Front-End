import { LabelHTMLAttributes } from 'react';
import styled from 'styled-components';

const LabelBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.darkGray};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => {
  return (
    <LabelBlock>
      <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
    </LabelBlock>
  );
};

export default Label;
