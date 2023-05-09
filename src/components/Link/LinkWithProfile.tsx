import Image from 'next/image';
import Link from '@/components/Link';
import styled from 'styled-components';

const LinkWithProfile = () => {
  return (
    <Link
      Header={
        <Profile>
          <div className='profile'>
            <Image src='/test.png' alt='profile' fill />
          </div>
          <span className='name'>닉네임</span>
        </Profile>
      }
    />
  );
};

export default LinkWithProfile;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  padding: 0 26px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3a3a3a;

  .profile {
    position: relative;
    overflow: hidden;

    width: 36px;
    height: 36px;
    margin-right: 8px;

    border-radius: 100%;
  }
`;
