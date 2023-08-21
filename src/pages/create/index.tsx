import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import API from '@/api/API';
import LinkInfo from '@/components/Create/LinkInfo';
import { MetaData } from '@/components/LinkItem';
import { setAccessToken } from '@/api/customAPI';
import Spinner from '@/components/Spinner';
import HashTagList from '@/components/Create/Tag/HashTagList';
import { validateHashTag } from '@/utils/validation';
import { useFetchTagsByUserId } from '@/queries';
import { withAuthProps, withAuth } from '@/lib/withAuth';
import { Tag } from '@/components/Common/Tag/BaseTag';
import HashTag from '@/components/Create/Tag/HashTag';
import AddTag from '@/components/Common/Tag/AddTag';
import useToastBar from '@/hooks/useToastBar';
import BottomButton from '@/components/Common/Bottom/BottomButton';
import TextInput from '@/components/Create/TextInput';
import ErrorMessage from '@/components/Create/TextInput/ErrorMessage';
import useDebounce from '@/hooks/useDebounce';
import { LabelIcon } from '@/components/svg/Svg';
import Label from '@/components/Create/Label';

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

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [hashtagInput, setHashTagInput] = useState('');
  const [hashtagList, setHashtagList] = useState<Tag[]>([]);
  const [metaData, setMetaData] = useState<MetaData>(null);
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
  const [isValid, setIsValid] = useState(false);
  const [nextTagId, setNextTagId] = React.useState(0);

  const handleInputBlur = () => {
    setHashTagInput('');
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

    const urlErrorMsg = validateUrl(url);
    if (!urlErrorMsg) {
      fetchMetaData(url);
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

    const [thumbnail, description, tagList] = [
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

  const debouncedUrl = useDebounce(url, 2000);

  useEffect(() => {
    if (debouncedUrl) {
      handleFetchURL();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUrl]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <Block style={{ marginBottom: '14px' }}>
        <TextInput
          id='url'
          label='링크'
          placeholder='URL을 입력하거나 복사한 URL을 입력해주세요.'
          errorMessage={errorMessages.url}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            invalidateForm();
          }}
          onClear={() => {
            setUrl('');
          }}
        />
      </Block>

      <Block style={{ marginBottom: '14px' }}>
        <TextInput
          id='title'
          label='제목'
          placeholder='제목을 입력하세요. (200자)'
          errorMessage={errorMessages.title}
          value={title}
          onChange={(e) => {
            const { value } = e.target;
            setTitle(value);
          }}
          onClear={() => {
            setTitle('');
          }}
        />
      </Block>

      <Block style={{ marginBottom: '29px' }}>
        <Label>
          미리보기
          {isLoading && <Spinner width='12px' />}
        </Label>
        {!isLoading && <LinkInfo {...(metaData as MetaData)} />}
      </Block>

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
        <ErrorMessage message={errorMessages.hashtag} />
      </Block>

      <Block style={{ marginBottom: '12px' }}>
        <Label>
          <LabelIcon />
          내가 저장한 태그
        </Label>
        <HashTagList
          tagList={savedTagList}
          TagComponent={HashTag}
          handleClick={({ tagName }) => handleAddTags(tagName)}
          highlightList={hashtagList}
        />
      </Block>
      <BottomButton text='추가하기' isAbled={isValid} />
    </Form>
  );
};

export default Create;

const Form = styled.form`
  padding: 16px 16px 0;
`;

const Block = styled.div`
  margin: 0 auto;
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
