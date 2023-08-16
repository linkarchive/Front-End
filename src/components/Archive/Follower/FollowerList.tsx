import styled, { css } from 'styled-components';
import Image from 'next/image';
import { IFollower } from './Follower.type';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@/api/API';
import { AxiosError } from 'axios';
import { ErrorMessage } from '@/pages/settings/profile';
import { useAppDispatch } from '@/store';
import useToastBar from '@/hooks/useToastBar';

const Block = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
  height: 56px;
  gap: 8px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 8px;
`;

const ProfileImage = styled.div`
  position: relative;
  overflow: hidden;

  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 100%;

  background: gray;

  gap: 8px;
`;

const TextInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Nickname = styled.span`
  color: #010101;
  font-size: 14px;
  font-weight: 500;
  line-height: 130%;
`;

const Introduce = styled.span`
  display: -webkit-box;
  overflow: hidden;

  color: #a1a1a1;
  font-size: 12px;
  font-weight: 500;
  line-height: 130%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Button = styled.button<{ isFollow: boolean }>`
  width: 69px;
  min-width: 69px;
  height: 34px;

  border-radius: 20px;
  border: 1px solid #a1a1a1;
  background: #fff;

  color: #858585;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 130%;

  ${({ isFollow }) =>
    isFollow &&
    css`
      background: #a1a1a1;

      color: #fff;
    `};
`;

const Follower = ({
  nickname,
  userId,
  introduce,
  profileImage,
  isFollow,
  isUser,
}: IFollower & { isUser: boolean }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { createToastMessage } = useToastBar();

  const buttonText = isFollow ? '팔로잉' : '팔로우';

  const followMutation = useMutation({
    mutationFn: API.followUser,
    onSuccess: () => {},
    onError: (error: AxiosError<ErrorMessage>) => {
      const errorMessage = error.response.data.message;
      createToastMessage(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user', userId]);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: API.unFollowUser,
    onSuccess: () => {},
    onError: (error: AxiosError<ErrorMessage>) => {
      const errorMessage = error.response.data.message;
      createToastMessage(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user', nickname]);
    },
  });

  const handleFollowClick = async () => {
    try {
      if (isFollow) {
        await unfollowMutation.mutateAsync(userId);
      }

      if (!isFollow) {
        await followMutation.mutateAsync(userId);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <Block>
      <Wrapper>
        {/** // FIXME 임시 라우팅 */}
        <Link href={`/${userId}`}>
          <Box>
            <ProfileImage>
              <Image alt='' src={profileImage} fill />
            </ProfileImage>
            <TextInfoBox>
              <Nickname>{nickname}</Nickname>
              <Introduce>{introduce}</Introduce>
            </TextInfoBox>
          </Box>
        </Link>
        {/* 본인인 경우 팔로우 버튼 노출을 막음 */}
        {!isUser && (
          <Button isFollow={isFollow} onClick={handleFollowClick}>
            {buttonText}
          </Button>
        )}
      </Wrapper>
    </Block>
  );
};

/**
 * @param authUserId 현재 로그인한 사용자 아이디
 */
const FollowerList = ({
  authUserId,
  followerList,
}: {
  authUserId?: string;
  followerList: IFollower[];
}) => {
  if (followerList.length === 0) {
    return <Block>목록이 없습니다.</Block>;
  }

  return (
    <>
      {followerList.map((follower) => (
        <Follower
          key={follower.userId}
          {...follower}
          isUser={parseInt(authUserId, 10) === follower.userId}
        />
      ))}
    </>
  );
};

export default FollowerList;
