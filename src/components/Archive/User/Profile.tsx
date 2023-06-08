import styled from 'styled-components';
import Image from 'next/image';
import { User } from '@/components/Archive/User/User.type';

interface ProfileProps extends User {}

const Profile = ({ id, nickname, introduce, profileImageFileName }: ProfileProps) => {
  return (
    <Wrapper>
      <div className='profile-image'>
        <Image alt='' src={profileImageFileName} fill />
      </div>
      <div className='info'>
        <div className='nickname'>{nickname}</div>
        <div className='introduce'>{introduce}</div>
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

export default Profile;
