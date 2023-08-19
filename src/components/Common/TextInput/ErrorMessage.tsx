import { CheckIcon } from '@/components/svg/Svg';
import React from 'react';
import styled from 'styled-components';
import { MessageWrapperProps } from '@/pages/settings/profile/nickname';

interface MessageToasterProps {
  isEmpty?: boolean;
  message: string;
  icon?: boolean;
}

const ErrorMessage = ({ isEmpty, message, icon }: MessageToasterProps) => {
  const isValid = !!message;
  return (
    <MessageWrapper isEmpty={isEmpty} isValid={isValid}>
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

  color: ${({ isValid, theme }) => {
    if (isValid) return theme.primary.main;
    return theme.warning.main;
  }};
  font-size: 14px;
`;

const StyledSpan = styled.span`
  margin-left: 2px;
`;
export default ErrorMessage;
