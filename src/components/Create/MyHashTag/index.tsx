import HashTagList from '@/components/Create/Tag/HashTagList';
import HashTag from '@/components/Create/Tag/HashTag';
import { Block } from '@/components/Create/Create.styled';
import Label from '@/components/Create/Label';
import { LabelIcon } from '@/components/svg/Svg';
import { useFetchTagsByUserId } from '@/queries';
import { Tag } from '@/components/Common/Tag/BaseTag';
import { validateHashTagList } from '@/utils/Create/validation';

const MyHashTag = ({
  nextTagId,
  setNextTagId,
  userId,
  hashtagList,
  onHashTagClick,
}: {
  nextTagId: number;
  setNextTagId: React.Dispatch<React.SetStateAction<number>>;
  userId: number;
  hashtagList: Tag[];
  onHashTagClick: (tag: Tag) => void;
}) => {
  const { data: tagListData } = useFetchTagsByUserId({ userId });
  const savedTagList = tagListData?.tagList || [];

  const handleAddTags = (text: string) => {
    if (text.length > 0 && !hashtagList.some((tag) => tag.tagName === text)) {
      const newTag = {
        tagId: nextTagId, // 현재 nextTagId 값을 사용
        tagName: text,
      };

      onHashTagClick(newTag);
      setNextTagId((prevId) => prevId + 1); // tagId를 1 증가시킵니다.
    }
  };

  return (
    <Block style={{ marginBottom: '12px' }}>
      <Label>
        <LabelIcon />
        내가 저장한 태그
      </Label>
      <HashTagList
        tagList={savedTagList}
        TagComponent={HashTag}
        handleClick={(tag) => {
          const newHashTagList = [...hashtagList, tag];
          if (validateHashTagList(newHashTagList.map((tag_) => tag_.tagName))) return;
          handleAddTags(tag.tagName);
        }}
        highlightList={hashtagList}
      />
    </Block>
  );
};

export default MyHashTag;
