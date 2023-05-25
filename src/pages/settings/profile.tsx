import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PhotoSvgIcon from 'public/assets/svg/photo.svg';
import { useImage } from '@/hooks/useImage';
import API from '@/api/API';

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
  userId: number;
  nickname: ValueWithInitial;
  introduce: ValueWithInitial;
};

const initialState: UserData = {
  userId: 0,
  nickname: { value: '', initialValue: '' },
  introduce: { value: '', initialValue: '' },
};

const initialImage = '/blanc.jpeg'; // 이미지 초기 url

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

const Profile = () => {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<UserData>(initialState);
  const { imageUrl, setImageUrl, onImageChange } = useImage(initialImage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], value },
    }));
  };

  const getMyProfile = async () => {
    const response = await API.getMyProfile();

    return response.data;
  };

  const setMyProfile = async () => {
    const data = await getMyProfile();

    setProfile({
      userId: data.id,
      nickname: { value: data.nickname, initialValue: data.nickname },
      introduce: { value: data.introduce, initialValue: data.introduce },
    });

    setImageUrl(data.profileImageFileName);
  };

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfileDetailPage());

    setMyProfile();
  }, []);

  return (
    <FormWrapper>
      <ImgWrapper>
        <ImgContainer>
          <ImgContent>
            <Image src={imageUrl} alt='cat' fill />
            <input
              type='file'
              accept='image/png'
              style={{ display: 'none' }}
              id='imageInput'
              onChange={onImageChange}
            />
          </ImgContent>
          <SvgIcon onClick={() => document.getElementById('imageInput').click()}>
            <PhotoSvgIcon />
          </SvgIcon>
        </ImgContainer>
      </ImgWrapper>
      <ProfileInput title='아이디' id='nickname' {...profile.nickname} onChange={handleChange} />
      <ProfileInput
        title='자기소개'
        id='introduce'
        {...profile.introduce}
        onChange={handleChange}
      />
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

export default Profile;
