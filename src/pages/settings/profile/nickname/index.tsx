import React, { useEffect, useState } from 'react';
import { BottomButton, InputWrapper, ProfileInputWrapper, StyledH3, StyledSpan } from '..';
import MessageToaster from '../MessageToaster';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import API from '@/api/API';
import useDebounce from '@/hooks/useDebounce';
import { DEBOUNCED_DELAY } from '@/constants';
import { withAuth, withAuthProps } from '@/lib/withAuth';
import { setAccessToken } from '@/api/customAPI';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';

export interface MessageWrapperProps {
  isEmpty: boolean;
  isValid: boolean;
}

export const getServerSideProps = withAuth();

const SetNickname = ({ accessToken, userId }: withAuthProps) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();
  const [nickname, setNickname] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('한글과 영문 사용 가능, 2~16자');
  const debouncedNickname = useDebounce(nickname, DEBOUNCED_DELAY);
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

            window.location.href = '/';
          },
        }
      );
    }
  };

  const validateNicknameMutation = useMutation(API.validateNickname, {
    onSuccess: (response) => {
      setIsValid(true);
      setMessage(response.message);
    },
  });

  const validateNickname = async () => {
    setIsValid(false);

    if (debouncedNickname.length < 2 || debouncedNickname.length > 16) {
      setMessage('한글과 영문 사용 가능, 2~16자');
      return;
    }

    try {
      await validateNicknameMutation.mutateAsync(debouncedNickname);
    } catch (error) {
      setMessage(error.response.data.message);
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
    dispatch(routerSlice.actions.loadSetNickname());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <FormWrapper onSubmit={handleInputSubmit}>
        <TextBox>
          닉네임만 설정하면 <br /> 트윙클을 이용할 수 있어요!
        </TextBox>

        <ProfileInputWrapper>
          <label htmlFor='nickname'>
            <StyledH3>
              닉네임 <StyledSpan>*</StyledSpan>
            </StyledH3>
          </label>

          <InputWrapper
            type='text'
            id='nickname'
            value={nickname}
            isChanged={nickname !== ''}
            onChange={handleInputChange}
            placeholder='닉네임을 입력해주세요.'
          />
          <MessageToaster
            isEmpty={nickname === ''}
            isValid={isValid}
            message={message}
            icon={isValid}
          />
        </ProfileInputWrapper>

        <BottomButton type='submit' disabled={!isValid}>
          수정하기
        </BottomButton>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 16px;
  height: 100vh;
`;

const FormWrapper = styled.form`
  padding-top: 20px;
  width: 100%;
`;

const TextBox = styled.h2`
  height: 130px;

  font-weight: 500;
  font-size: 24px;
  line-height: 31.2px;
`;

export default SetNickname;
