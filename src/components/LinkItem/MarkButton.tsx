import styled from 'styled-components';
import IcoMark from 'public/assets/svg/link.svg';
import { useToggleMark } from '@/hooks/useToggleMark';
import { QueryKey } from '@tanstack/react-query';

const MarkBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 18.2px */
  color: ${({ theme }) => theme.gray.darkGray};

  cursor: pointer;
`;

const Mark = styled.span<{ isActivated: boolean }>`
  svg path {
    fill: ${({ isActivated, theme }) => (isActivated ? theme.primary.main : '')};
  }
`;

const MarkIcon = styled.div`
  position: relative;

  width: 12px;
  height: 12px;
  margin-right: 8px;
`;

const MarkButton = ({
  linkId,
  queryKey,
  isMark,
  bookMarkCount,
}: {
  linkId: number;
  queryKey: QueryKey;
  isMark: boolean;
  bookMarkCount: number;
}) => {
  const { handleToggleMark } = useToggleMark({ linkId, isMark, queryKey });

  return (
    <MarkBtn
      type='button'
      onClick={(e) => {
        e.preventDefault();
        handleToggleMark();
      }}
    >
      <MarkIcon>
        <Mark isActivated={isMark}>
          <IcoMark />
        </Mark>
      </MarkIcon>
      {bookMarkCount}
    </MarkBtn>
  );
};

export default MarkButton;
