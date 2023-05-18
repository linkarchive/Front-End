import TagLabel from '@/components/LinkItem/TagLabel';
import styled from 'styled-components';

const TagLabelList = ({ className }: { className?: string }) => {
  return (
    <Wrapper className={className}>
      <li>
        <TagLabel />
      </li>
      <li>
        <TagLabel />
      </li>
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
