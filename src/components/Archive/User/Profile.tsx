import styled from 'styled-components';
import Image from 'next/image';

const Profile = () => {
  return (
    <Wrapper>
      <div className='profile-image'>
        <Image alt='' src='/test.png' fill />
      </div>
      <div className='info'>
        <div className='name'>우ㅇ삼이</div>
        <div className='desc'>안녕하세요</div>
      </div>
    </Wrapper>
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

  .name {
    margin-bottom: 4px;

    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }

  .desc {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;

export default Profile;
