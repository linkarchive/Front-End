import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import API from '@/api/API';
import { BottomNavHight } from '@/components/BottomNav/BottomNav';
import Input, { InputWithButton } from '@/components/Input';
import LinkInfo from '@/components/Create/LinkInfo';
import { MetaData } from '@/components/LinkItem';
import { setAccessToken } from '@/api/customAPI';
import { withAuth } from '@/lib/withAuth';
import Spinner from '@/components/Spinner';
import { createToastBar } from '@/store/slices/toastBarSlice';
import HashTagList from '@/components/Create/HashTagList';
import FavoriteTagList from '@/components/Create/FavoriteTagList';

const defaultErrorMessages = {
  url: '',
  title: '',
  hashtag: '',
};

export const getServerSideProps = withAuth();

const Create = ({ userId, accessToken }: { userId: string; accessToken: string }) => {
  setAccessToken(accessToken);
  const usernickname = userId; // TODO getTagsByNickname 백엔드 작업 후 userId가 아닌 nickname으로 변경

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadCreatePage());
  }, [dispatch]);

  const router = useRouter();

  const urlInput = useRef('');
  const [title, setTitle] = useState('');
  const [hashtagInput, setHashTagInput] = useState('');
  const [hashtagList, setHashtagList] = useState<string[]>([]);
  const [metaData, setMetaData] = useState<MetaData>(null);
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
  const [isValid, setIsValid] = useState(false);

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

  const { data: tagListData } = useQuery({
    queryKey: ['user', 'tagList', 10],
    queryFn: () => API.getTagsByNickname({ usernickname, size: 10 }),
    retry: 1,
  });
  const tagList = tagListData?.tagList || [];

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
    if (text.length > 0 && !hashtagList.includes(text)) newHashTagList.push(text);

    const hashtagErrMsg = validateHashTagList(newHashTagList);

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

    const [url, thumbnail, description, tags] = [
      urlInput.current,
      metaData?.metaThumbnail,
      truncateDesc(metaData?.metaDescription),
      [...hashtagList],
    ];

    const errorMessage = validateForm({ title, tags });
    const isFormValid = Object.values(errorMessage).every((err) => err === '');
    if (!isFormValid) {
      setErrorMessages(errorMessage);
      return;
    }

    createLink.mutate(
      { url, title, description, thumbnail, tags },
      {
        onSuccess: () => {
          dispatch(createToastBar({ text: '링크가 추가되었습니다.' }));
          router.push('/');
        },
      }
    );
  };

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
          <p className='info'>자주 사용하는 태그</p>
          <FavoriteTagList tags={tagList} onClick={({ tagName }) => handleAddTags(tagName)} />
        </Bottom>
        <HashTagList
          tags={hashtagList}
          handleDelete={(value) => setHashtagList((prev) => prev.filter((v) => v !== value))}
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
  bottom: ${BottomNavHight};

  width: var(--default-width);
  padding-bottom: 29px;
`;

const Button = styled.button`
  width: 343px;
  height: 53px;
  border-radius: 4px;

  background: var(--button-color-primary);

  color: var(--font-color-white);
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
    TOO_LONG: '최대 8글자 입력해주세요',
    TOO_SHORT: '최소 2글자 입력해주세요',
    NO_SPECIAL: '특수기호는 안돼요',
    NO_SPACE: '공백을 제거해주세요',
    MAXIMUM: '최대 10개까지 등록할 수 있어요',
  },
};

const validateForm = ({
  title,
  tags: hashtagList,
}: {
  title: string;
  tags: string[];
}): typeof defaultErrorMessages => {
  const titleErrMsg = validateTitle(title);
  const hashtagErrMsg = validateHashTagList(hashtagList);

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

const validateHashTag = (text: string): string => {
  const whiteSpaceRegex = /\s/;
  const specialSybmolsRegEx = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
  const isShort = text.length < 2; // 최소 2글자
  const isLong = text.length > 8; // 최대 8글자
  const hasWhitespace = whiteSpaceRegex.test(text); // 공백 불가
  const hasSpecialSymbols = !specialSybmolsRegEx.test(text); // 특수기호, 이모지 불가

  if (isShort) {
    return ERROR_MESSAGE.HASHTAG.TOO_SHORT;
  }
  if (isLong) {
    return ERROR_MESSAGE.HASHTAG.TOO_LONG;
  }
  if (hasWhitespace) {
    return ERROR_MESSAGE.HASHTAG.NO_SPACE;
  }
  if (hasSpecialSymbols) {
    return ERROR_MESSAGE.HASHTAG.NO_SPECIAL;
  }

  return '';
};

const validateUrl = (url: string): string => {
  const urlRegex =
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
