import styled from 'styled-components';
import Image from 'next/image';

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
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.div`
  position: relative;
  overflow: hidden;

  width: 40px;
  height: 40px;
  border-radius: 100%;

  background: gray;
`;

const TextInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 8px;
`;

const Nickname = styled.span`
  color: #010101;
  font-size: 14px;
  font-weight: 500;
  line-height: 130%;
`;

const Introduce = styled.span`
  color: #a1a1a1;
  font-size: 12px;
  font-weight: 500;
  line-height: 130%;
`;

const Button = styled.button`
  width: 69px;
  height: 34px;

  border-radius: 20px;
  background: #a1a1a1;

  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 130%;
`;

const Following = () => {
  const nickname = '햄스터';
  const profileImageFileName =
    'https://linkarchive-profile.s3.ap-northeast-2.amazonaws.com/d3f66c50-9c52-4d61-96bd-77bfaa8cab2e?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230726T153548Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAZK5CFVRDWSVSNV5X%2F20230726%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=7821469675f613ba41d5ddb70478cabc04294439044a57fba04528130a55892e';

  return (
    <Block>
      <Wrapper>
        <Box>
          <ProfileImage>
            <Image alt='' src={profileImageFileName} fill />
          </ProfileImage>
          <TextInfoBox>
            <Nickname>{nickname}</Nickname>
            <Introduce>안녕하세요 개구리입니다</Introduce>
          </TextInfoBox>
        </Box>
        <Button>팔로우</Button>
      </Wrapper>
    </Block>
  );
};

const FollowingList = () => {
  const isEmpty = false;
  if (isEmpty) {
    return <Block>목록이 없습니다.</Block>;
  }

  return (
    <>
      <Following />
      <Following />
      <Following />
      <Following />
      <Following />
      <Following />
      <Following />
    </>
  );
};

export default FollowingList;
