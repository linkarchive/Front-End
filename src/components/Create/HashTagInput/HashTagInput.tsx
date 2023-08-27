import AddTag from '@/components/Common/Tag/AddTag';
import { Block } from '@/components/Create/Create.styled';
import Label from '@/components/Create/Label';
import HashTagList from '@/components/Create/Tag/HashTagList';
import ErrorMessage from '@/components/Create/TextInput/ErrorMessage';
import { useState } from 'react';
import HashTag from '@/components/Create/Tag/HashTag';
import { validateHashTagList } from '@/utils/Create/validation';
import { Tag } from '@/components/Common/Tag/BaseTag';

const HashTagInput = () => {
  const [hashtagList, setHashtagList] = useState<Tag[]>([]);
  const [hashtagInput, setHashTagInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nextTagId, setNextTagId] = useState(0);

  const handleInputBlur = () => {
    setHashTagInput('');
  };

  const handleClick = (tag) => {
    setHashtagList((prev) => prev.filter((t) => t.tagName !== tag.tagName));
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

    setHashtagList(newHashTagList);
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
            if (e.key === 'Enter') handleAddTags(hashtagInput.trim());
          }}
        />
      </HashTagList>
      <ErrorMessage message={errorMessage} />
    </Block>
  );
};

export default HashTagInput;
