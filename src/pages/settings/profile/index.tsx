import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useImage } from '@/hooks/useImage';
import API from '@/api/API';
import useDebounce from '@/hooks/useDebounce';
import { DEBOUNCED_DELAY } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { withAuth } from '@/lib/withAuth';
import { setAccessToken } from '@/api/customAPI';
import { createToastBar } from '@/store/slices/toastBarSlice';
import { cancelSource } from '@/utils/cancelToken';
import { PhotoSvgIcon } from '@/components/svg/Svg';
import MessageToaster from './MessageToaster';

export interface ErrorMessage {
  message: string;
}

type ValueWithInitial = {
  value: string;
  initialValue: string;
};

type UserData = {
  nickname: ValueWithInitial;
  introduce: ValueWithInitial;
};

const initialState: UserData = {
  nickname: { value: '', initialValue: '' },
  introduce: { value: '', initialValue: '' },
};

export const getServerSideProps = withAuth();

const Profile = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<UserData>(initialState);
  const { imageUrl, setImageUrl, onImageChange } = useImage(''); // FIXME: 최초 렌더링시 깜빡이는 이슈 lazy-loading적용
  const debouncedNickname = useDebounce(profile.nickname.value, DEBOUNCED_DELAY);
  const [message1, setMessage1] = useState<string | null>(null);
  const [message2, setMessage2] = useState<string | null>(null);

  // boolean
  const [isNicknameChanged, setIsNicknameChanged] = useState<boolean>(false);
  const [isIntroduceChanged, setIsIntroduceChanged] = useState<boolean>(false);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(true);
  const [isIntroduceValid, setIsIntroduceValid] = useState<boolean>(true);

  const isFormValid =
    (isNicknameChanged && isNicknameValid && !isIntroduceChanged) ||
    (isIntroduceChanged && isIntroduceValid && !isNicknameChanged) ||
    (isNicknameChanged && isIntroduceChanged && isNicknameValid && isIntroduceValid);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], value },
    }));
  };

  const updateUserProfileMutation = useMutation({ mutationFn: API.updateUserProfile });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateUserProfileMutation.mutate(
      {
        nickname: profile.nickname.value,
        introduce: profile.introduce.value,
      },
      {
        onSuccess: async (data) => {
          setProfile({
            nickname: { value: data.nickname, initialValue: data.nickname },
            introduce: { value: data.introduce, initialValue: data.introduce },
          });

          await API.setCookie({ name: 'nickname', value: debouncedNickname });
          dispatch(createToastBar({ text: '프로필이 수정되었습니다.' }));
        },
        onError: (error: AxiosError<ErrorMessage>) => {
          // eslint-disable-next-line no-alert
          alert(error.response?.data?.message);
        },
      }
    );
  };

  const getMyProfile = async () => {
    const response = await API.getMyProfile();

    return response;
  };

  const setMyProfile = async () => {
    const data = await getMyProfile();

    setProfile({
      nickname: { value: data?.nickname, initialValue: data?.nickname },
      introduce: { value: data?.introduce, initialValue: data?.introduce },
    });

    setImageUrl(data?.profileImageFileName);
  };

  const validateNicknameMutation = useMutation(API.validateNickname, {
    onSuccess: (response) => {
      setIsNicknameValid(true);
      setMessage1(response.message);
    },
  });

  const validateNickname = async () => {
    setIsNicknameValid(false);

    if (debouncedNickname.length < 2 || debouncedNickname.length > 16) {
      setMessage1('2글자 ~ 16글자를 입력해주세요');
      return;
    }

    try {
      await validateNicknameMutation.mutateAsync(debouncedNickname);
    } catch (error) {
      setMessage1(error.response.data.message);
    }
  };

  useEffect(() => {
    setMyProfile();

    dispatch(routerSlice.actions.loadProfileDetailPage());
    return () => {
      // axios 요청 취소
      cancelSource();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isNicknameChanged && !profile.nickname.value) {
      setMessage1('영문, 2~16글자');
    }
    if (profile.nickname.value !== profile.nickname.initialValue) {
      setIsNicknameChanged(true);
    } else {
      setIsNicknameChanged(false);
    }
  }, [isNicknameChanged, profile.nickname]);

  useEffect(() => {
    if (debouncedNickname && isNicknameChanged) {
      validateNickname();
    } else {
      setIsNicknameValid(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNickname]);

  useEffect(() => {
    if (profile.introduce.value !== profile.introduce.initialValue) {
      setIsIntroduceChanged(true);
    } else {
      setIsIntroduceChanged(false);
    }
  }, [profile.introduce]);

  useEffect(() => {
    if (profile.introduce.value?.length > 20) {
      setMessage2('자기소개는 20자 이하로 작성해주세요.');
      setIsIntroduceValid(false);
    } else {
      setMessage2('');
      setIsIntroduceValid(true);
    }
  }, [profile.introduce.value?.length]);

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <ImgWrapper>
        <ImgContainer>
          <ImgContent>
            <Image src={imageUrl} alt='cat' fill />
            <input
              type='file'
              accept='image/png, image/jpeg, image/jpg, image/gif'
              style={{ display: 'none' }}
              id='imageInput'
              data-testid='imageInput'
              onChange={(e) => onImageChange(e)}
            />
          </ImgContent>
          <SvgIcon onClick={() => document.getElementById('imageInput').click()}>
            <PhotoSvgIcon />
          </SvgIcon>
        </ImgContainer>
      </ImgWrapper>
      <ProfileInputWrapper>
        <label htmlFor='nickname'>
          <StyledH3>
            닉네임 <StyledSpan>*</StyledSpan>
          </StyledH3>
        </label>

        <InputWrapper
          type='text'
          id='nickname'
          value={profile.nickname.value}
          isChanged={profile.nickname.value !== profile.nickname.initialValue}
          onChange={handleChange}
        />
        {isNicknameChanged && <MessageToaster isValid={isNicknameValid} message={message1} icon />}
      </ProfileInputWrapper>

      <ProfileInputWrapper>
        <label htmlFor='nickname'>
          <StyledH3>소개</StyledH3>
        </label>

        <TextAreaWrapper
          placeholder='소개글을 입력해주세요.'
          id='introduce'
          value={profile.introduce.value}
          isChanged={profile.introduce.value !== profile.introduce.initialValue}
          onChange={handleChange}
        />
        {isIntroduceChanged && <MessageToaster isValid={isIntroduceValid} message={message2} />}
      </ProfileInputWrapper>
      <BottomButton type='submit' disabled={!isFormValid}>
        수정하기
      </BottomButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  padding: 0 16px;
  height: 100%;
`;

const StyledH3 = styled.h3`
  padding: 15px 0;

  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
`;

const StyledSpan = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
  color: ${({ theme }) => theme.primary.main};
`;

const ImgWrapper = styled.div`
  display: flex;
  height: 150px;
  justify-content: center;
  align-items: center;
`;

const ProfileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  margin-bottom: 10px;
`;

const ImgContainer = styled.span`
  position: relative;
`;

const ImgContent = styled.span`
  box-sizing: content-box;
  display: flex;
  overflow: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.secondary.main};
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  width: 100px;
  height: 100px;
`;

const InputWrapper = styled.input<{ isChanged: boolean }>`
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  height: 30px;

  font-size: 18px;
  font-weight: 500;
  line-height: 23.4px;

  outline: none;

  color: ${({ theme }) => theme.common.black};
  border-color: ${({ isChanged, theme }) =>
    isChanged ? theme.primary.main : theme.gray.mediumGray};
`;

const TextAreaWrapper = styled.textarea<{ isChanged: boolean }>`
  display: block;
  position: relative;
  width: 343px;
  min-height: 96px;
  padding: 10px;
  outline: none;
  resize: none;
  border: 1px solid
    ${({ isChanged, theme }) => (isChanged ? theme.primary.main : theme.gray.lighterGray)};
  border-radius: 10px;

  color: ${({ theme }) => theme.common.black};
  font-size: 16px;
  font-weight: 500;
  line-height: 20.8px;

  &::placeholder {
    color: ${({ theme }) => theme.gray.lighterGray};
  }
`;

const SvgIcon = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 100%;
  padding: 4px;

  background-color: ${({ theme }) => theme.common.black};
  cursor: pointer;

  svg {
    display: flex;
    justify-content: center;
    margin: auto;
    fill: ${({ theme }) => theme.common.white};
  }

  :hover > svg {
    fill: ${({ theme }) => theme.gray.lighterGray};
  }
`;

export const BottomButton = styled.button`
  position: absolute;
  bottom: 22px;
  width: 343px;
  height: 56px;

  background: ${({ theme }) => theme.primary.main};
  border: none;
  border-radius: 10px;
  gap: 8px;

  color: ${({ theme }) => theme.common.white};
  cursor: pointer;

  &:disabled {
    background: ${({ theme }) => theme.warning.dark};
    cursor: not-allowed;
  }
`;

export default Profile;
