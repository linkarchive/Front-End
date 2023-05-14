import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import API from '@/api/API';
import { BottomNavHight } from '@/components/BottomNav';
import Header from '@/components/Header';
import Input, { InputWithButton } from '@/components/Input';
import LinkInfo from '@/components/Create/LinkInfo';
import TagLabelList from '@/components/LinkItem/TagLabelList';

const isValidUrl = (url: string): Boolean => {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return urlRegex.test(url);
};

const Create = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadCreatePage());
  }, [dispatch]);

  const urlInput = useRef('');
  const [errorMessages, setErrorMessages] = useState({
    url: '',
    title: '',
    hashtag: '',
  });

  const [isValid, setIsValid] = useState(false);
  // TODO api 연동 작업
  const fetchURLMetadata = useQuery(['metadata', urlInput.current], {
    queryFn: ({ queryKey }) => API.urlMetadata(encodeURIComponent(queryKey[1])),
    enabled: isValid,
    retry: false,
  });

  const handleFetchURL = () => {
    if (isValidUrl(urlInput.current)) {
      setIsValid(true);
    } else {
      setErrorMessages((prev) => ({ ...prev, url: ERROR_MESSAGE.URL.INVALID }));
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
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
          <Input label='제목' onChange={() => {}} />
          <Bottom>
            <p className='info'>미리보기</p>
            <LinkInfo />
          </Bottom>
        </InputBlock>
        <InputBlock>
          <InputWithButton text='asdf' onClick={() => {}} label='asdf' onChange={() => {}} />
          <Bottom>
            <p className='info'>자주 사용하는 태그</p>
          </Bottom>
        </InputBlock>
        <ButtonBlock>
          <Button disabled>추가하기</Button>
        </ButtonBlock>
      </Wrapper>
    </>
  );
};

export default Create;

const Wrapper = styled.div`
  padding-top: 16px;
`;

const InputBlock = styled.div`
  padding: 0 34px;
  margin-bottom: 24px;
`;

const Bottom = styled.div`
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
};
