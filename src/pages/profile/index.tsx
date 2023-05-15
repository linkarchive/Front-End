import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type ProfileInputProps = {
  label: string;
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

const ProfileInput = ({ label, id, value, initialValue, onChange }: ProfileInputProps) => (
  <Wrapper>
    <label htmlFor={id}>{label}</label>
    <InputWrapper
      type='text'
      id={id}
      value={value}
      isChanged={value !== initialValue}
      onChange={onChange}
    />
  </Wrapper>
);

const Profile = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialState);

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
        <ImgContent>
          <Image src='/blanc.jpeg' alt='cat' fill />
        </ImgContent>
      </ImgWrapper>
      <ProfileInput label='name' id='name' {...state.name} onChange={handleChange} />
      <ProfileInput label='intro' id='intro' {...state.intro} onChange={handleChange} />
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
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
  border-bottom: 2px solid black;

  color: var(--font-color-mediumgray);
  border-color: ${({ isChanged }) =>
    isChanged ? `var(--border-color-primary)` : `var(--border-color-gray)`};
`;

export default Profile;
