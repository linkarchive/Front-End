import ProfileImage from '@/components/Archive/User/ProfileImage';
import { LogoIcon, NotificationIcon } from '@/components/svg/Svg';
import { RootState } from '@/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MainHeader = () => {
  const { myProfileImage } = useSelector((state: RootState) => state.user);

  return (
    <HeaderContainer>
      <Link href='/'>
        <LogoIcon />
      </Link>
      <ActionsWrapper>
        <NotificationIconBox>
          <NotificationIcon />
        </NotificationIconBox>
        <Link href='/settings'>
          <ProfileWrapper>
            {myProfileImage && <ProfileImage src={myProfileImage} size='24px' />}
          </ProfileWrapper>
        </Link>
      </ActionsWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 60px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
`;

const NotificationIconBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  cursor: pointer;

  > div {
    box-sizing: border-box;
    border: 2px solid ${({ theme }) => theme.secondary.main};
  }
`;

export default MainHeader;
