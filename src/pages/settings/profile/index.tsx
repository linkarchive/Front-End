import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PhotoSvgIcon from 'public/assets/svg/photo.svg';
import { useImage } from '@/hooks/useImage';
import API from '@/api/API';
import useDebounce from '@/hooks/useDebounce';
import { DEBOUNCED_DELAY } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { MessageWrapperProps } from './setnickname';
import { AxiosError } from 'axios';
import { withAuth } from '@/lib/withAuth';
import { setAccessToken } from '@/api/customAPI';

interface ErrorMessage {
  message: string;
}

type ProfileInputProps = {
  title: string;
  id: string;
  value: string;
  initialValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

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

const initialImage = '/white.jpeg';

export const getServerSideProps = withAuth();

const ProfileInput = ({ title, id, value, initialValue, onChange }: ProfileInputProps) => (
  <ProfileInputWrapper>
    <label htmlFor={id}>
      <h3>{title}</h3>
    </label>
    <InputWrapper
      type='text'
      id={id}
      value={value}
      isChanged={value !== initialValue}
      onChange={onChange}
    />
  </ProfileInputWrapper>
);

const Profile = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<UserData>(initialState);
  const { imageUrl, setImageUrl, onImageChange } = useImage(initialImage);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      nickname: { value: data.nickname, initialValue: data.nickname },
      introduce: { value: data.introduce, initialValue: data.introduce },
    });

    setImageUrl(data.profileImageFileName);
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
  }, []);

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfileDetailPage());
  }, [dispatch]);

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
  }, [debouncedNickname]);

  useEffect(() => {
    if (profile.introduce.value !== profile.introduce.initialValue) {
      setIsIntroduceChanged(true);
    } else {
      setIsIntroduceChanged(false);
    }
  }, [profile.introduce]);

  useEffect(() => {
    if (profile.introduce.value.length > 20) {
      setMessage2('자기소개는 20자 이하로 작성해주세요.');
      setIsIntroduceValid(false);
    } else {
      setMessage2('');
      setIsIntroduceValid(true);
    }
  }, [profile.introduce.value.length]);

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <ImgWrapper>
        <ImgContainer>
          <ImgContent>
            <Image src={imageUrl} alt='cat' fill />
            <input
              type='file'
              accept='image/png'
              style={{ display: 'none' }}
              id='imageInput'
              onChange={(e) => onImageChange(e)}
            />
          </ImgContent>
          <SvgIcon onClick={() => document.getElementById('imageInput').click()}>
            <PhotoSvgIcon />
          </SvgIcon>
        </ImgContainer>
      </ImgWrapper>
      <ProfileInput title='아이디' id='nickname' {...profile.nickname} onChange={handleChange} />
      {isNicknameChanged && (
        <NicknameMessageWrapper isValid={isNicknameValid}>{message1}</NicknameMessageWrapper>
      )}
      <ProfileInput
        title='자기소개'
        id='introduce'
        {...profile.introduce}
        onChange={handleChange}
      />
      {isIntroduceChanged && (
        <IntroduceMessageWrapper isValid={isIntroduceValid}>{message2}</IntroduceMessageWrapper>
      )}
      <Button type='submit' disabled={!isFormValid}>
        수정하기
      </Button>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  input {
    margin: 10px 0;
    height: 30px;

    font-size: var(--font-size-md);
    outline: none;
  }
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
  height: 100px;
  margin-bottom: 10px;
`;

const ImgContainer = styled.span`
  position: relative;
`;

const ImgContent = styled.span`
  display: flex;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color-darkgray);
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  width: 70px;
  height: 70px;
`;

const InputWrapper = styled.input<{ isChanged: boolean }>`
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 10px;

  color: var(--font-color-darkgray);
  border-color: ${({ isChanged }) =>
    isChanged ? `var(--border-color-primary)` : `var(--border-color-gray)`};
`;

const SvgIcon = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 100%;
  padding: 6px;

  background-color: var(--border-color-darkgray);
  cursor: pointer;

  svg {
    display: flex;
    justify-content: center;
    margin: auto;
    width: var(--svg-width-sm);
    height: var(--svg-height-sm);
    fill: var(--svg-color-lightGray);
  }

  &:hover svg {
    fill: var(--svg-color-hover);
  }
`;

const NicknameMessageWrapper = styled.div<MessageWrapperProps>`
  position: sticky;
  width: 165px;
  margin-top: 5px;

  color: ${(props) => (props.isValid ? 'var(--font-color-primary)' : 'var(--font-color-warn)')};
  font-size: var(--font-size-sm);
`;

const IntroduceMessageWrapper = styled.div<MessageWrapperProps>`
  position: sticky;
  width: 165px;
  margin-top: 5px;

  color: ${(props) => (props.isValid ? 'var(--font-color-primary)' : 'var(--font-color-warn)')};
  font-size: var(--font-size-sm);
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  margin-top: 15px;

  background: var(--button-color-primary);
  border: none;
  border-radius: 4px;

  color: var(--font-color-white);
  cursor: pointer;

  &:disabled {
    background: var(--button-color-disabled);
    cursor: not-allowed;
  }
`;

export default Profile;
