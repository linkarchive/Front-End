import styled from 'styled-components';
import { useToggleMark } from '@/hooks/useToggleMark';
import { QueryKey } from '@tanstack/react-query';
import { MarkIcon } from '@/components/svg/Svg';

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

const MarkIconBox = styled.span`
  margin-right: 8px;
`;

const BookMarkCountBox = styled.span`
  margin-top: -3px;
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
      <MarkIconBox>
        <MarkIcon fill={isMark ? '#FF5248' : '#ddd'} />
      </MarkIconBox>
      <BookMarkCountBox>{bookMarkCount}</BookMarkCountBox>
    </MarkBtn>
  );
};

export default MarkButton;
