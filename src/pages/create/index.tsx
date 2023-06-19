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
// import HashTagList from '@/components/Create/HashTagList'; TODO mvp 이후 개발 */

const defaultErrorMessages = {
  url: '',
  title: '',
  hashtag: '',
};

export const getServerSideProps = withAuth();

const Create = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadCreatePage());
  }, [dispatch]);

  const router = useRouter();

  const urlInput = useRef('');
  const [title, setTitle] = useState('');
  /**  // TODO mvp 이후 개발
  const [hashtagInput, setHashTagInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  */
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

  // TODO api 통신 작업
  /** MVP 이후 개발
    const {
      data: freqTags,
      isLoading,
      isError,
    } = useQuery(['freqTagList'], { queryFn: () => API.tagsByUserId(''), enabled: false });
  */

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

  /** 
   * // TODO mvp 이후 개발
  const handleAddTags = (text) => {
    let message = '';
    if (hashtags.length === 5) {
      message = ERROR_MESSAGE.HASHTAG.MAXIMUM;
      handleErrorMessage({ key: 'hashtag', message });
      return;
    }
    message = validateHashTag(text);
    if (message) {
      handleErrorMessage({ key: 'hashtag', message });
      return;
    }
    setHashtags((prev) => [...prev, text]);
    initErrorMessage({ key: 'hashtag' });
  };
  */

  const createLink = useMutation({ mutationFn: API.createLink });

  const handleCreate = () => {
    if (createLink.isLoading) return;

    const titleErrMsg = validateTitle(title);
    if (titleErrMsg) {
      setErrorMessage({ key: 'title', message: titleErrMsg });
      return;
    }

    const [url, thumbnail, description] = [
      urlInput.current,
      metaData?.metaThumbnail,
      truncateDesc(metaData?.metaDescription),
    ];

    const tags = []; //  [...hashtags];
    createLink.mutate(
      { url, title, description, thumbnail, tags },
      {
        onSuccess: () => router.push('/'),
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
        <Bottom>
          <p className='info'>미리보기</p>
          <LinkInfo {...(metaData as MetaData)} />
        </Bottom>
      </InputBlock>
      {/** 
      <InputBlock>
        <InputWithButton
          label='해시태그'
          value={hashtagInput}
          onKeyDown={(e) => {
            // FIXME 한글 입력시 'ㅁㄴㅇㄹ ' 공백 입력 이슈
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
            setHashTagInput('');
          }}
        />
        <Bottom>
           // TODO MVP 제외
            <p className='info'>자주 사용하는 태그</p>
            <TagLabelList /> 
          <HashTagList
            tags={hashtags}
            handleDelete={(value) => setHashtags((prev) => prev.filter((v) => v !== value))}
          />
        </Bottom>
      </InputBlock>
    */}

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
  position: relative;
  top: 12px;

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
    TOO_LONG: '너무 길어요',
    TOO_SHORT: '너무 짧아요',
    NO_SPECIAL: '특수기호는 안돼요',
    MAXIMUM: '5개까지 등록할 수 있어요',
  },
};

const validateHashTag = (text: string): string => {
  const encoder = new TextEncoder();
  const byteLength = encoder.encode(text).length;
  const isValidLength = !(byteLength < 4 || byteLength > 16); // 최소 4바이트, 최대 16바이트
  const noSpecialSybmols = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/; // 특수기호, 이모지 불가

  if (!isValidLength) {
    return ERROR_MESSAGE.HASHTAG.TOO_LONG;
  }

  if (!noSpecialSybmols.test(text)) {
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
