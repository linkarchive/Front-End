import TagLabel from '@/components/LinkItem/TagLabel';
import styled from 'styled-components';
import { Tag } from '@/components/LinkItem/';

const TagLabelList = ({ className, tags }: { className?: string; tags: Tag[] }) => {
  const tagList = tags
    ? (tags.reduce((arr: unknown[], item) => {
        arr.push(Object.values(item)[0]);
        return arr;
      }, []) as string[])
    : [];

  return (
    <Wrapper className={className}>
      {tagList.map((tag, id) => (
        <li key={`${tag}${id}`}>
          <TagLabel text={tag as string} />
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
