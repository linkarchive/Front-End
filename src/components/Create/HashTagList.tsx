import HashTag from '@/components/HashTag/HashTag';
import styled from 'styled-components';

const HashTagList = ({
  tags,
  handleDelete,
}: {
  tags: string[];
  handleDelete: (title: string) => void;
}) => {
  return (
    <Wrapper>
      {tags.map((text) => (
        <HashTag key={text} title={text} isDeletable onClick={({ text: t }) => handleDelete(t)} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 6px;
`;

export default HashTagList;
