import TagLabel from '@/components/LinkItem/TagLabel';
import styled from 'styled-components';
import { Tag } from '@/components/LinkItem/';

const FavoriteTagList = ({
  className,
  tags,
  onClick,
}: {
  className?: string;
  tags: Tag[];
  onClick?: (tag: Tag) => void;
}) => {
  return (
    <Wrapper className={className}>
      {tags.map(({ tagId, tagName }) => (
        <li key={tagId}>
          <div onClick={() => onClick({ tagId, tagName })}>
            <TagLabel text={tagName} />
          </div>
        </li>
      ))}
    </Wrapper>
  );
};

export default FavoriteTagList;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;

  margin-bottom: 4px;

  li {
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;
