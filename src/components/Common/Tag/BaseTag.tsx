import styled from 'styled-components';

export type Tag = {
  tagId: number;
  tagName: string;
};

interface HashTagProps {
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
  children: React.ReactNode;
}

const BaseTag = ({ children, onClick, ...props }: HashTagProps) => {
  return (
    <BaseWrapper onClick={onClick} {...props}>
      {children}
    </BaseWrapper>
  );
};

const BaseWrapper = styled.span`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-style: normal;
  font-weight: 500;
`;

export default BaseTag;
