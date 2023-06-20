/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useDebounce from '@/hooks/useDebounce';
import { DEBOUNCED_DELAY } from '@/constants';
import CheckGreenSvg from 'public/assets/svg/check-green.svg';
import XMark from 'public/assets/svg/XMark-red.svg';
import API from '@/api/API';
import { useMutation } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { BottomNavHight } from '@/components/BottomNav/BottomNav';
import { useRouter } from 'next/router';
import { ENGLISH_ONLY_REGEX } from '@/utils/regex';

export interface MessageWrapperProps {
  isValid: boolean;
}

const NicknameModal = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('영문, 2~16자');
  const debouncedNickname = useDebounce(nickname, DEBOUNCED_DELAY);
  const isVerified = !isLoading && isValid;
  const isInvalid = !isLoading && !isValid;
  const isAbled = isVerified;
  const updateNicknameMutation = useMutation({ mutationFn: API.updateNickname });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (ENGLISH_ONLY_REGEX.test(value)) {
      setNickname(value);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedNickname.trim() !== '') {
      updateNicknameMutation.mutate(
        { nickname: debouncedNickname, userId },
        {
          onSuccess: async () => {
            await API.setCookie({ name: 'nickname', value: debouncedNickname });

            window.location.href = '/archive';
          },
        }
      );
    }
  };

  const Logout = async () => {
    try {
      await API.deleteAllCookies();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const validateNicknameMutation = useMutation(API.validateNickname, {
    onSuccess: (response) => {
      setIsValid(true);
      setMessage(response.message);
      setIsLoading(false);
    },
  });

  const validateNickname = async () => {
    setIsLoading(true);
    setIsValid(false);

    if (debouncedNickname.length < 2 || debouncedNickname.length > 16) {
      setMessage('2글자 ~ 16글자를 입력해주세요');
      setIsLoading(false);
      return;
    }

    try {
      await validateNicknameMutation.mutateAsync(debouncedNickname);
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedNickname) {
      validateNickname();
    } else {
      setIsValid(null);
    }
  }, [debouncedNickname]);

  useEffect(() => {
    if (!nickname) {
      setMessage('영문, 2~16글자');
    }
  }, [nickname]);

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
            <AcceptButton type='submit' disabled={!isAbled}>
              입력 완료
            </AcceptButton>
          </ButtonWrapper>
        </Form>
      </Content>
    </Wrapper>
  );
};

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  inset: 0;
  display: flex;
  margin: auto;

  justify-content: center;
  align-items: center;

  background-color: var(--background-color-popup);
`;

const Content = styled.div`
  animation: ${slideUp} 0.8s ease-out;
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
  background: var(--button-color-disabled);

  color: var(--font-color-white);
  cursor: not-allowed;

  &:enabled {
    background: var(--button-color-primary);
    cursor: pointer;
  }
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

export default NicknameModal;
