import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import API from '@/api/API';
import Input, { InputWithButton } from '@/components/Input';
import LinkInfo from '@/components/Create/LinkInfo';
import { MetaData } from '@/components/LinkItem';
import { setAccessToken } from '@/api/customAPI';
import Spinner from '@/components/Spinner';
import HashTagList from '@/components/Common/Tag/HashTagList';
import { validateHashTag } from '@/utils/validation';
import { useFetchTagsByUserId } from '@/queries';
import { withAuthProps, withAuth } from '@/lib/withAuth';
import { Tag } from '@/components/Common/Tag/BaseTag';
import HashTag from '@/components/Common/Tag/HashTag';
import AddTag from '@/components/Common/Tag/AddTag';
import useToastBar from '@/hooks/useToastBar';

const defaultErrorMessages = {
  url: '',
  title: '',
  hashtag: '',
};

export const getServerSideProps = withAuth();

const Create = ({ userId, accessToken }: withAuthProps) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { createToastMessage } = useToastBar();

  const urlInput = useRef('');
  const [title, setTitle] = useState('');
  const [hashtagInput, setHashTagInput] = useState('');
  const [hashtagList, setHashtagList] = useState<Tag[]>([]);
  const [metaData, setMetaData] = useState<MetaData>(null);
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
  const [isValid, setIsValid] = useState(false);
  const [nextTagId, setNextTagId] = React.useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputBlur = () => {
    setIsEditing(false);
    setHashTagInput('');
  };

  const handleAddTagClick = () => {
    setIsEditing(true);
  };

  const initErrorMessage = () => {
    setErrorMessages(defaultErrorMessages);
  };

  const invalidateForm = () => {
    setIsValid(false);
  };

  const setErrorMessage = ({
    key,
    message,
  }: {
    key: keyof typeof defaultErrorMessages;
    message: string;
  }) => {
    const errmsgs = { ...errorMessages };
    errmsgs[key] = message;
    setErrorMessages(errmsgs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTagInput(e.target.value);
  };

  const { data: tagListData } = useFetchTagsByUserId({ userId });
  const savedTagList = tagListData?.tagList || [];

  const { mutate: fetchMetaData, isLoading } = useMutation({
    mutationFn: API.getLinkMetadata,
    onSuccess: (data_) => {
      setMetaData(data_);
      setTitle(data_?.metaTitle);
      setIsValid(true);
      initErrorMessage();
    },
    onError: () => {
      setErrorMessage({ key: 'url', message: ERROR_MESSAGE.URL.INVALID });
      setIsValid(false);
    },
  });

  const handleFetchURL = () => {
    if (isLoading) return;

    const urlErrorMsg = validateUrl(urlInput.current);
    if (!urlErrorMsg) {
      fetchMetaData(urlInput.current);
    } else {
      setErrorMessage({ key: 'url', message: urlErrorMsg });
      invalidateForm();
    }
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
      setErrorMessage({ key: 'hashtag', message: hashtagErrMsg });
      return;
    }

    setHashtagList(newHashTagList);
    setHashTagInput('');
    setErrorMessage({ key: 'hashtag', message: '' });
  };

  const createLink = useMutation({ mutationFn: API.createLink });

  const handleCreate = () => {
    if (createLink.isLoading) return;

    const tagNameList = hashtagList.map((tag) => tag.tagName);

    const [url, thumbnail, description, tagList] = [
      urlInput.current,
      metaData?.metaThumbnail,
      truncateDesc(metaData?.metaDescription),
      [...tagNameList],
    ];

    const errorMessage = validateForm({ title, tagList });
    const isFormValid = Object.values(errorMessage).every((err) => err === '');
    if (!isFormValid) {
      setErrorMessages(errorMessage);
      return;
    }

    createLink.mutate(
      { url, title, description, thumbnail, tagList },
      {
        onSuccess: () => {
          createToastMessage('링크가 추가되었습니다.');
          router.push('/');
        },
      }
    );
  };

  const handleClick = (tag) => {
    setHashtagList((prev) => prev.filter((t) => t.tagName !== tag.tagName));
  };

  useEffect(() => {
    dispatch(routerSlice.actions.loadCreatePage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <InputBlock>
        <InputWithButton
          text='불러오기'
          ButtonChildren={isLoading && <Spinner width='16' color='#fff' />}
          onClick={handleFetchURL}
          label='링크'
          errMessage={errorMessages.url}
          onChange={(e) => {
            urlInput.current = e.target.value;
            invalidateForm();
          }}
        />
      </InputBlock>
      <InputBlock>
        <Input
          label='제목'
          value={title}
          errMessage={errorMessages.title}
          onChange={(e) => {
            const { value } = e.target;
            setTitle(value);
          }}
        />
        <Bottom style={{ marginBottom: '29px' }}>
          <p className='info'>미리보기</p>
          <LinkInfo {...(metaData as MetaData)} />
        </Bottom>
      </InputBlock>

      <InputBlock>
        <AddTag
          hashtagInput={hashtagInput}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          handleInputBlur={handleInputBlur}
          handleAddTagClick={handleAddTagClick}
        />
        <InputWithButton
          label='해시태그'
          value={hashtagInput}
          onKeyDown={(e) => {
            if (e.key === ' ') e.preventDefault();
          }}
          onChange={(e) => {
            setHashTagInput(e.target.value);
          }}
          text='추가'
          errMessage={errorMessages.hashtag}
          onClick={() => {
            if (!hashtagInput) return;
            handleAddTags(hashtagInput.trim());
          }}
        />
        <Bottom style={{ marginBottom: '12px' }}>
          <p className='info'>나의 태그 목록</p>
          <HashTagList
            tagList={savedTagList}
            TagComponent={HashTag}
            handleClick={({ tagName }) => handleAddTags(tagName)}
            highlightList={hashtagList}
          />
        </Bottom>

        <HashTagList
          tagList={hashtagList}
          TagComponent={HashTag}
          handleClick={handleClick}
          isDeletable
          isHighLight
        />
      </InputBlock>

      <ButtonBlock>
        <Button type='submit' disabled={!isValid}>
          추가하기
        </Button>
      </ButtonBlock>
    </Form>
  );
};

export default Create;

const Form = styled.form`
  padding-top: 16px;
`;

const InputBlock = styled.div`
  padding: 0 5px;
  margin: 0 auto 6px;
  width: 310px;
`;

const Bottom = styled.div`
  width: 276px;
  margin: 0 auto;

  > p {
    margin-bottom: 5px;

    color: #858585;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }
`;

const ButtonBlock = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 70px;

  width: '40px';
  padding-bottom: 29px;
`;

const Button = styled.button`
  width: 343px;
  height: 53px;
  border-radius: 4px;

  background: ${({ theme }) => theme.primary.main};

  color: ${({ theme }) => theme.common.white};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  &:disabled {
    opacity: 0.3;
  }
`;

const ERROR_MESSAGE = {
  URL: {
    INVALID: 'URL을 다시 확인해주세요',
  },
  TITLE: {
    INVALID: '제목을 입력해주세요',
  },
  HASHTAG: {
    MAXIMUM: '최대 10개까지 등록할 수 있어요',
  },
};

const validateForm = ({
  title,
  tagList,
}: {
  title: string;
  tagList: string[];
}): typeof defaultErrorMessages => {
  const titleErrMsg = validateTitle(title);
  const hashtagErrMsg = validateHashTagList(tagList);

  const errorMsg = {
    title: titleErrMsg,
    hashtag: hashtagErrMsg,
    url: '',
  };

  return errorMsg;
};

const validateHashTagList = (hashtagList: string[]): string => {
  const MAX_HASHTAG = 10; // 최대 10개 등록 가능

  if (hashtagList.length >= MAX_HASHTAG) {
    return ERROR_MESSAGE.HASHTAG.MAXIMUM;
  }

  const errors = hashtagList
    .map((hashtag) => validateHashTag(hashtag))
    .filter((errMesg) => errMesg !== '');

  return errors[0] || '';
};

const validateUrl = (url: string): string => {
  const urlRegex =
    // eslint-disable-next-line no-useless-escape
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (!urlRegex.test(url)) return ERROR_MESSAGE.URL.INVALID;

  return '';
};

const validateTitle = (title: string): string => {
  if (!title) return ERROR_MESSAGE.TITLE.INVALID;

  return '';
};

/** 설명은 500자 제한 */
function truncateDesc(str) {
  if (str.length > 500) {
    return `${str.slice(0, 500)}`;
  }
  return str;
}
