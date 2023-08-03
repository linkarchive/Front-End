import { ChevronRight } from '@/components/svg/Svg';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const LinkTo = ({
  href,
  title,
  content,
  border,
}: {
  href: string;
  title: string;
  content?: string;
  border?: boolean;
}) => {
  return (
    <Link href={href}>
      <Content border={border}>
        <StyledH3>{title}</StyledH3>
        {content ? (
          <Box>
            <StyledSpan>{content}</StyledSpan>
            <ChevronRight />
          </Box>
        ) : (
          <ChevronRight />
        )}
      </Content>
    </Link>
  );
};

const Content = styled.div<{ border?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  ${({ border, theme }) => border && `border-bottom: 1px solid ${theme.gray.lightBlack};`}
`;

const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.common.black};
  font-size: 16px;
  font-weight: 500;
  line-height: 20.8px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;
const StyledSpan = styled.span`
  margin-right: 10px;

  font-size: 16px;
  line-height: 20.8px;
  color: ${({ theme }) => theme.gray.lightGray};
`;
export default LinkTo;
