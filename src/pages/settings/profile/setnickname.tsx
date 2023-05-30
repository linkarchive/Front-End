import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '@/hooks/useDebounce';
import { DEBOUNCED_DELAY, NICKNAME, USER_ID } from '@/constants';
import CheckGreenSvg from 'public/assets/svg/check-green.svg';
import XMark from 'public/assets/svg/XMark-red.svg';
import API from '@/api/API';
import { useMutation } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { BottomNavHight } from '@/components/BottomNav/BottomNav';
import { deleteAllCookies, getCookie, setCookie } from '@/utils';
import { useRouter } from 'next/router';

interface MessageWrapperProps {
  isValid: boolean;
}

const SetNickname = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const userId = getCookie(USER_ID);
  const debouncedNickname = useDebounce(nickname, DEBOUNCED_DELAY);
  const isVerified = !isLoading && isValid;
  const isInvalid = !isLoading && !isValid;
  const updateNicknameMutation = useMutation({ mutationFn: API.updateNickname });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedNickname.trim() !== '') {
      updateNicknameMutation.mutate(
        { nickname: debouncedNickname, userId },
        {
          onSuccess: () => {
            setCookie(NICKNAME, debouncedNickname, 30);
            router.push('/');
          },
          onError: () => {
            // API 호출이 에러로 끝났을 때 실행할 코드
            // 필요에 따라 추가 구현
          },
        }
      );
    }
  };

  const Logout = () => {
    deleteAllCookies();
    router.push('/');
  };

  const validateNicknameMutation = useMutation(API.validateNickname, {
    onSuccess: (response) => {
      if (response.data.status === 200) {
        setIsValid(true);
        setMessage('사용 가능한 아이디 입니다.');
      } else {
        setIsValid(false);
        setMessage('중복된 아이디 입니다.');
      }
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      setMessage('오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const validateNickname = async () => {
    setIsLoading(true);
    setIsValid(false);

    if (debouncedNickname.length < 2 || debouncedNickname.length > 16) {
      setMessage('2글자~16글자를 입력해주세요');
      setIsLoading(false);
      return;
    }

    await validateNicknameMutation.mutateAsync(debouncedNickname);
  };

  useEffect(() => {
    if (debouncedNickname) {
      validateNickname();
    } else {
      setIsValid(null);
      setMessage(null);
    }
  }, [debouncedNickname]);

  return (
    <Wrapper>
      <Content>
        <Form onSubmit={handleInputSubmit}>
          <H3>닉네임을 입력해주세요</H3>
          <InputWrapper>
            <label htmlFor='nickname' style={{ display: 'none' }} />
            <Input id='nickname' type='text' value={nickname} onChange={handleInputChange} />
            {nickname && (
              <SvgWrapper>
                {isLoading && <Spinner width='14' height='14' />}
                {isVerified && <CheckGreenSvg />}
                {isInvalid && <XMark />}
              </SvgWrapper>
            )}
          </InputWrapper>
          <MessageWrapper isValid={isValid}>{message && message}</MessageWrapper>
          <ButtonWrapper>
            <CancelButton type='button' onClick={Logout}>
              다음에 입력하기
            </CancelButton>
            <AcceptButton type='submit'>입력 완료</AcceptButton>
          </ButtonWrapper>
        </Form>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  inset: 0 0 ${BottomNavHight} 0;
  display: flex;
  margin: auto;

  justify-content: center;
  align-items: center;

  background-color: var(--background-color-popup);
`;

const Content = styled.div`
  overflow: hidden;
  width: 330px;
  height: 230px;

  border-radius: 5px;

  background-color: var(--background-color-default);
  box-shadow: 6px 6px 2px 1px rgba(0 0 0 20%);

  gap: 1rem;
`;

const H3 = styled.h3`
  color: var(--font-color-primary);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-bottom: 30px;
`;

const Input = styled.input`
  width: 170px;
  padding: 5px;
  border: 1px solid var(--border-color-gray);
  border-radius: 3px;

  color: var(--font-color-darkgray);

  outline: none;
`;

const Button = styled.button`
  display: inline-block;
  width: 50%;
  height: 40px;
  padding: 3px;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background: var(--button-color-cancel);

  color: var(--font-color-white);
`;

const AcceptButton = styled(Button)`
  background: var(--button-color-primary);

  color: var(--font-color-white);
`;

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  width: 100%;

  justify-content: center;

  background-color: red;
`;

const SvgWrapper = styled.span`
  position: absolute;
  right: 0;
  display: flex;

  padding-right: 8px;
`;

const MessageWrapper = styled.div<MessageWrapperProps>`
  position: sticky;
  width: 165px;
  margin-top: 5px;

  color: ${(props) => (props.isValid ? 'var(--font-color-primary)' : 'var(--font-color-warn)')};
  font-size: var(--font-size-sm);
`;

export default SetNickname;
