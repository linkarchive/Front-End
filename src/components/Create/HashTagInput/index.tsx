import { useState } from 'react';
import HashTagList from '@/components/Create/Tag/HashTagList';
import HashTag from '@/components/Create/Tag/HashTag';
import { Block } from '@/components/Create/Create.styled';
import Label from '@/components/Create/Label';
import AddTag from '@/components/Common/Tag/AddTag';
import ErrorMessage from '@/components/Create/TextInput/ErrorMessage';
import { validateHashTagList } from '@/utils/Create/validation';
import { Tag } from '@/components/Common/Tag/BaseTag';

const HashTagInput = ({
  nextTagId,
  setNextTagId,
  hashtagList,
  onChageHashTag,
}: {
  nextTagId: number;
  setNextTagId: React.Dispatch<React.SetStateAction<number>>;
  hashtagList: Tag[];
  onChageHashTag: (tagList: Tag[]) => void;
}) => {
  const [hashtagInput, setHashTagInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputBlur = () => {
    setHashTagInput('');
  };

  const handleClick = (tag) => {
    const newHashTagList = hashtagList.filter((t) => t.tagName !== tag.tagName);
    onChageHashTag(newHashTagList);
  };

  const handleAddTags = (text: string) => {
    const newHashTagList = [...hashtagList];

    if (text.length > 0 && !hashtagList.some((tag) => tag.tagName === text)) {
      const newTag = {
        tagId: nextTagId, // 현재 nextTagId 값을 사용
        tagName: text,
      };
      newHashTagList.push(newTag);

      setNextTagId((prevId) => prevId + 1); // tagId를 1 증가시킵니다.
    }

    const hashtagErrMsg = validateHashTagList(newHashTagList.map((tag) => tag.tagName));

    if (hashtagErrMsg) {
      setErrorMessage(hashtagErrMsg);
      return;
    }

    onChageHashTag(newHashTagList);
    setHashTagInput('');
    setErrorMessage('');
  };

  return (
    <Block>
      <Label>해시태그</Label>
      <HashTagList
        tagList={hashtagList}
        TagComponent={HashTag}
        handleClick={handleClick}
        isDeletable
        isHighLight
      >
        <AddTag
          hashtagInput={hashtagInput}
          handleInputChange={(e) => {
            setHashTagInput(e.target.value);
          }}
          handleInputBlur={handleInputBlur}
          handleAddTagClick={() => {
            if (!hashtagInput) return;
            handleAddTags(hashtagInput.trim());
          }}
          onKeyDown={(e) => {
            if (e.key === ' ') e.preventDefault();
            if (e.key === 'Enter') {
              e.preventDefault(); // 엔터시 clearButton 클릭 이벤트를 막음
              handleAddTags(hashtagInput.trim());
            }
          }}
        />
      </HashTagList>
      <ErrorMessage message={errorMessage} />
    </Block>
  );
};

export default HashTagInput;
