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
import HashTagList from '@/components/Create/HashTagList';

const Create = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadCreatePage());
  }, [dispatch]);

  const router = useRouter();

  const urlInput = useRef('');
  const [title, setTitle] = useState('');
  const [hashtagInput, setHashTagInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState({
    url: '',
    title: '',
    hashtag: '',
  });
  const [isValid, setIsValid] = useState(false);

  // TODO api 통신 작업
  /** MVP 이후 개발
    const {
      data: freqTags,
      isLoading,
      isError,
    } = useQuery(['freqTagList'], { queryFn: () => API.tagsByUserId(''), enabled: false });
  */
  const getURLMetadata = useQuery(['metadata', urlInput.current], {
    queryFn: () => API.getUrlMetadata(encodeURIComponent(urlInput.current)),
    enabled: isValid,
    retry: false,
  });
  const createLink = useMutation({ mutationFn: API.createLink });

  const handleFetchURL = () => {
    if (isValidUrl(urlInput.current)) {
      setIsValid(true);
    } else {
      handleErrorMessage({ key: 'url', message: ERROR_MESSAGE.URL.INVALID });
    }
  };

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

  const handleCreate = () => {
    if (createLink.isLoading) return;

    const [link, thumbnail] = ['', ''];
    const tagList = [...hashtags];
    createLink.mutate(
      { title, link, thumbnail, tagList },
      {
        onSuccess: () => router.push('/'),
      }
    );
  };

  const initErrorMessage = ({ key }: { key: string }) => {
    handleErrorMessage({ key, message: '' });
  };

  const handleErrorMessage = ({ key, message }: { key: string; message: string }) => {
    const errmsgs = { ...errorMessages };
    errmsgs[key] = message;
    setErrorMessages(errmsgs);
  };

  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <InputBlock>
        <InputWithButton
          text='불러오기'
          onClick={handleFetchURL}
          label='링크'
          errMessage={errorMessages.url}
          onChange={(e) => {
            urlInput.current = e.target.value;
          }}
        />
      </InputBlock>
      <InputBlock>
        <Input
          label='제목'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Bottom>
          <p className='info'>미리보기</p>
          <LinkInfo />
        </Bottom>
      </InputBlock>
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
          {/* // TODO MVP 제외
            <p className='info'>자주 사용하는 태그</p>
            <TagLabelList /> */}
          <HashTagList
            tags={hashtags}
            handleDelete={(value) => setHashtags((prev) => prev.filter((v) => v !== value))}
          />
        </Bottom>
      </InputBlock>
      <ButtonBlock>
        <Button type='submit' disabled={!getURLMetadata.isSuccess}>
          추가하기
        </Button>
      </ButtonBlock>
    </Wrapper>
  );
};

export default Create;

const Wrapper = styled.form`
  padding-top: 16px;
`;

const InputBlock = styled.div`
  padding: 0 34px;
  margin-bottom: 24px;
`;

const Bottom = styled.div`
  position: relative;
  top: 12px;

  p {
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
    background: var(--button-color-disabled);

    color: var(--font-color-white);
  }
`;

const ERROR_MESSAGE = {
  URL: {
    INVALID: 'URL을 다시 확인해주세요',
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

const isValidUrl = (url: string): Boolean => {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return urlRegex.test(url);
};
