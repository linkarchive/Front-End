import TagLabel from '@/components/LinkItem/TagLabel';
import styled from 'styled-components';
import { Tag } from '@/components/LinkItem/';

const TagLabelList = ({ className, tags }: { className?: string; tags: Tag[] }) => {
  return (
    <Wrapper className={className}>
      {tags.map((tag) => (
        <li key={tag}>
          <TagLabel text={tag} />
        </li>
      ))}
    </Wrapper>
  );
};

export default TagLabelList;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;

  margin-bottom: 4px;

  li {
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;
