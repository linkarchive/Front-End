import styled from 'styled-components';
import Image from 'next/image';
import { User } from '@/components/Archive/User/User.type';
import { useEffect, useState } from 'react';
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
    <>
      <Wrapper>
        <div className='profile-image'>
          <Image alt='' src={profileImageFileName} fill />
        </div>
        <div className='info'>
          <div className='nickname'>{nickname}</div>
          <div className='introduce'>{introduce}</div>
        </div>
      </Wrapper>
      <Content>
        <span>팔로워 : {followerCount}</span>
        <span>팔로잉 : {followingCount}</span>
        <Button
          isActive={isAlarm}
          onClick={handleAlarmClick}
          text='알람'
          svg={
            <AlarmBellSvg
              color={
                isAlarm
                  ? 'var(--hashtag-color-active-border)'
                  : 'var(--hashtag-color-inactive-border)'
              }
            />
          }
          width='79px'
        />
        <Button
          isActive={isFollow}
          onClick={handleFollowClick}
          text='팔로우'
          svg={
            <PlusSvg
              color={
                isFollow
                  ? 'var(--hashtag-color-active-border)'
                  : 'var(--hashtag-color-inactive-border)'
              }
            />
          }
          width='90px'
        />
      </Content>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 86px;
  padding: 0 26px;

  color: var(--font-color-darkgray);

  .profile-image {
    position: relative;
    overflow: hidden;

    width: 48px;
    height: 48px;
    margin-right: 8px;
    border-radius: 100%;
  }

  .nickname {
    margin-bottom: 4px;

    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }

  .introduce {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Profile;
