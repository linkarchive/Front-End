import { MessageWrapperProps } from '@/components/Archive/NicknameModal';
import { CheckIcon } from '@/components/svg/Svg';
import React from 'react';
import styled from 'styled-components';

interface MessageToasterProps {
  isValid: boolean;
  message: string;
  icon?: boolean;
}

const MessageToaster = ({ isValid, message, icon }: MessageToasterProps) => {
  return (
    <MessageWrapper isValid={isValid}>
      {icon ? (
        <>
          <CheckIcon />
          <StyledSpan>{message}</StyledSpan>
        </>
      ) : (
        <span>{message}</span>
      )}
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div<MessageWrapperProps>`
  display: flex;
  justify-content: left;
  align-items: center;
  position: sticky;
  height: 18px;
  margin-top: 5px;

  color: ${({ isValid, theme }) => (isValid ? theme.primary.main : theme.warning.main)};
  font-size: 16px;
`;

const StyledSpan = styled.span`
  margin-left: 2px;
`;
export default MessageToaster;
