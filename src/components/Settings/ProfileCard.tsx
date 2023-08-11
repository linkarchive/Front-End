import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Archive/User/ProfileImage';
import Link from 'next/link';

interface ProfileCardProps {
  profileImage: string;
  nickname: string;
  followerCount: number;
  followingCount: number;
}

const ProfileCard = ({ ...data }: ProfileCardProps) => {
  const { profileImage, nickname, followerCount, followingCount } = data;

  return (
    <Info>
      <ProfileWrapper>
        <ProfileImage src={profileImage} size='72px' />
        <Username>{nickname}</Username>
      </ProfileWrapper>
      <InteractiveWrapper>
        <FollowGroup>
          <FollowerBox>
            <FollowContent>팔로워</FollowContent>
            <FollowCount>{followerCount}</FollowCount>
          </FollowerBox>
          <FollowingBox>
            <FollowContent>팔로잉</FollowContent>
            <FollowCount>{followingCount}</FollowCount>
          </FollowingBox>
        </FollowGroup>

        <ButtonGroup>
          <Link href='/settings/profile'>
            <Button>프로필 수정</Button>
          </Link>
        </ButtonGroup>
      </InteractiveWrapper>
    </Info>
  );
};

const Username = styled.div`
  margin-top: 10px;

  font-size: 26px;
  font-weight: 600;
  line-height: 26px;
`;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  flex-grow: 1;
`;
const Info = styled.section`
  display: flex;
  width: 343px;
  height: 208px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  background-color: #f5f5f5;
  border-radius: 10px;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.gray.darkWhite};

  background-color: ${({ theme }) => theme.common.white};
  border-radius: 20px;

  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
  color: ${({ theme }) => theme.gray.darkGray};
`;

const InteractiveWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 28px;
  align-items: center;
  flex-grow: 2;
`;

const FollowGroup = styled.div`
  display: flex;
`;

const FollowerBox = styled.span`
  display: flex;
  padding-right: 12px;
  flex-direction: column;
`;

const FollowContent = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 15.6px;
  color: ${({ theme }) => theme.gray.mediumGray};
`;

const FollowCount = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.gray.mediumGray};
  line-height: 20.8px;
`;

const FollowingBox = styled.span`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  > span {
    margin-left: 8px;
  }
`;
export default ProfileCard;
