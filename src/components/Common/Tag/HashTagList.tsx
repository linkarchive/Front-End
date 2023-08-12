import styled from 'styled-components';
import { Tag } from './BaseTag';
import { HashTagProps } from './HashTag';
import FilteringTag from './FilteringTag';
import { useAppDispatch } from '@/store';
import { onClickHashTag } from '@/store/slices/hashTagSlice';

interface HashTagListProps {
  tagList: Tag[];
  TagComponent: React.ComponentType<HashTagProps>;
  handleClick?: (tag: Tag) => void;
  isDeletable?: boolean;
  highlightList?: Tag[];
  isHighLight?: boolean;
}

const HashTagList = ({
  tagList,
  handleClick,
  TagComponent,
  isDeletable,
  highlightList,
  isHighLight: defaultHighlight,
}: HashTagListProps) => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      {TagComponent === FilteringTag && (
        <FilteringTag
          tag={{
            tagId: 0,
            tagName: 'All',
          }}
          handleClick={() => dispatch(onClickHashTag({ tagId: 0, tagName: 'All' }))}
        />
      )}
      {tagList.map((tag) => {
        let isTagHighLight = defaultHighlight || false;

        if (highlightList) {
          isTagHighLight = highlightList.some(
            (highlightTag) => highlightTag.tagName === tag.tagName
          );
        }

        return (
          <TagComponent
            key={tag.tagId}
            tag={tag}
            handleClick={handleClick}
            isDeletable={isDeletable}
            isHighLight={isTagHighLight}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 6px;
`;

export default HashTagList;
