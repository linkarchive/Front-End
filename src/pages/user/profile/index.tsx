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

const dummyData = {
  name: '오징어게임 기훈이형',
  intro: '기훈이 형!!',
};

const initialState = {
  name: { value: '', initialValue: '' },
  intro: { value: '', initialValue: '' },
};

export async function getServerSideProps(context) {
  // id를 URL 파라미터에서 가져옵니다
  const { id } = context.query;

  // 데이터를 서버에서 불러옵니다. 실제로는 API 요청을 사용해야 합니다.
  const userData = await API.getUserProfile(id);

  // 불러온 데이터를 props로 반환합니다
  return { props: { userData } };
}

const initialImage = '/blanc.jpeg';
// FIXME: userData로 변경해야함.. id를 파라미터에서 어떻게 가지고 올까?
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
  const [state, setState] = useState(initialState);
  const { image, onImageChange } = useImage(initialImage);

  useEffect(() => {
    setState({
      name: { value: dummyData.name, initialValue: dummyData.name },
      intro: { value: dummyData.intro, initialValue: dummyData.intro },
    });
    dispatch(routerSlice.actions.loadProfileDetailPage());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], value },
    }));
  };

  return (
    <FormWrapper>
      <ImgWrapper>
        <ImgContainer>
          <ImgContent>
            <Image src={image} alt='cat' fill />
            <input
              type='file'
              accept='image/*'
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
      <ProfileInput title='이름' id='name' {...state.name} onChange={handleChange} />
      <ProfileInput title='자기소개' id='intro' {...state.intro} onChange={handleChange} />
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
