import styled, { css } from 'styled-components';
import Image from 'next/image';
import { IFollower } from './Follower.type';

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

const Button = styled.button<{ isfollow: boolean }>`
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

  ${({ isfollow }) =>
    isfollow &&
    css`
      background: #a1a1a1;

      color: #fff;
    `};
`;

const Follower = ({ nickname, introduce, profileImageFileName, isfollow }: IFollower) => {
  const buttonText = isfollow ? '팔로잉' : '팔로우';
  return (
    <Block>
      <Wrapper>
        <Box>
          <ProfileImage>
            <Image alt='' src={profileImageFileName} fill />
          </ProfileImage>
          <TextInfoBox>
            <Nickname>{nickname}</Nickname>
            <Introduce>{introduce}</Introduce>
          </TextInfoBox>
        </Box>
        <Button isfollow={isfollow}>{buttonText}</Button>
      </Wrapper>
    </Block>
  );
};

const FollowerList = ({ followerList }: { followerList: IFollower[] }) => {
  if (followerList.length === 0) {
    return <Block>목록이 없습니다.</Block>;
  }

  return (
    <>
      {followerList.map((follower) => (
        <Follower key={follower.userId} {...follower} />
      ))}
    </>
  );
};

export default FollowerList;
