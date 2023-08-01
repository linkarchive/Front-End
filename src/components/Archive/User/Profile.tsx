import styled from 'styled-components';
import Image from 'next/image';
import { User } from '@/components/Archive/User/User.type';
import { useState } from 'react';
import Button from './Button';
import { AlarmBellSvg, PlusSvg } from '@/components/svg/Svg';
import API from '@/api/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '@/store';
import { createToastBar } from '@/store/slices/toastBarSlice';
import { AxiosError } from 'axios';
import { ErrorMessage } from '@/pages/settings/profile';

interface ProfileProps extends User {
  followerCount: number;
  followingCount: number;
}

const Profile = ({
  id,
  nickname,
  introduce,
  profileImageFileName,
  followerCount,
  followingCount,
}: ProfileProps) => {
  const [isAlarm, setIsAlarm] = useState<boolean>(false);
  const [isFollow, setIsFollow] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: API.followUser,
    onSuccess: () => {
      setIsFollow(true);
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      const errorMessage = error.response.data.message;
      setIsFollow(false);
      dispatch(createToastBar({ text: errorMessage }));
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user', nickname]);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: API.unFollowUser,
    onSuccess: () => {
      setIsFollow(false);
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      const errorMessage = error.response.data.message;
      setIsFollow(true);
      dispatch(createToastBar({ text: errorMessage }));
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user', nickname]);
    },
  });

  const handleAlarmClick = () => {
    setIsAlarm(!isAlarm);
    dispatch(createToastBar({ text: '개발중' }));
  };
  const handleFollowClick = async () => {
    try {
      if (isFollow) {
        await unfollowMutation.mutateAsync(id);
      } else {
        await followMutation.mutateAsync(id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <ProfileWrapper>
        <ProfileInfoBox>
          <ProfileNickname>{nickname}</ProfileNickname>
          <ProfileIntro>{introduce}</ProfileIntro>
        </ProfileInfoBox>

        <ProfileImage>
          <Image alt='profile_image' src={profileImageFileName} fill />
        </ProfileImage>
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
          <Button
            isActive={isAlarm}
            onClick={handleAlarmClick}
            text='알림'
            svg={<AlarmBellSvg color={isAlarm ? '#FF5248' : '#aaaaaa'} />}
            width='79px'
          />
          <Button
            isActive={isFollow}
            onClick={handleFollowClick}
            text='팔로우'
            svg={<PlusSvg color={isFollow ? '#FF5248' : '#aaaaaa'} />}
            width='91px'
          />
        </ButtonGroup>
      </InteractiveWrapper>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 86px;
  padding: 16px;

  color: ${({ theme }) => theme.common.black};
`;

const ProfileInfoBox = styled.div``;

const ProfileNickname = styled.div`
  margin-bottom: 4px;

  font-size: 18px;
  line-height: 23.4px;
`;

const ProfileIntro = styled.div`
  font-size: 14px;
  line-height: 18.2px;

  color: ${({ theme }) => theme.gray.lightGray};
`;

const ProfileImage = styled.div`
  position: relative;
  overflow: hidden;

  width: 72px;
  height: 72px;
  margin-right: 8px;
  border-radius: 100%;
`;

const InteractiveWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
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

export default Profile;
