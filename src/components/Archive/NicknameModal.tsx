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
import { useRouter } from 'next/router';
import { zIndex } from '@/constants/zIndex';

export interface MessageWrapperProps {
  isValid: boolean;
}

const NicknameModal = ({ userId }: { userId: number }) => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('한글또는 영문, 2~16자');
  const debouncedNickname = useDebounce(nickname, DEBOUNCED_DELAY);
  const isVerified = !isLoading && isValid;
  const isInvalid = !isLoading && !isValid;
  const isAbled = isVerified;
  const updateNicknameMutation = useMutation({ mutationFn: API.updateNickname });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNickname]);

  useEffect(() => {
    if (!nickname) {
      setMessage('한글또는 영문, 2~16자');
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
  z-index: ${zIndex.Modal};
  position: fixed;
  inset: 0;
  display: flex;
  margin: auto;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.gray.lighterGray};
`;

const Content = styled.div`
  animation: ${slideUp} 0.8s ease-out;
  overflow: hidden;
  width: 330px;
  height: 230px;

  border-radius: 5px;

  background-color: ${({ theme }) => theme.common.white};
  box-shadow: 6px 6px 2px 1px rgba(0 0 0 20%);

  gap: 1rem;
`;

const H3 = styled.h3`
  color: ${({ theme }) => theme.primary.main};
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
  border: 1px solid ${({ theme }) => theme.gray.mediumGray};
  border-radius: 3px;

  color: ${({ theme }) => theme.gray.darkGray};

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
  background: ${({ theme }) => theme.warning.main};

  color: ${({ theme }) => theme.common.white};
`;

const AcceptButton = styled(Button)`
  background: ${({ theme }) => theme.warning.main};

  color: ${({ theme }) => theme.common.white};
  cursor: not-allowed;

  &:enabled {
    background: ${({ theme }) => theme.primary.main};
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

  color: ${({ isValid, theme }) => (isValid ? theme.primary.main : theme.warning.main)};
  font-size: 10px;
`;

export default NicknameModal;
