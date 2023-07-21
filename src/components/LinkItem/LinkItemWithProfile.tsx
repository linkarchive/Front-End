import Image from 'next/image';
import LinkItem, { LinkItemWithProfileProps } from '@/components/LinkItem';
import styled from 'styled-components';
import Link from 'next/link';

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  padding: 0 26px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  a,
  a:visited {
    color: var(--font-color-darkgray);
    text-decoration: none;
  }

  .profile {
    position: relative;
    overflow: hidden;

    width: 36px;
    height: 36px;
    margin-right: 8px;
    border-radius: 100%;
  }
`;

const LinkWithProfile = ({
  userId,
  nickname,
  profileImage,
  ...props
}: LinkItemWithProfileProps) => {
  const href = `/${userId}`;
  return (
    <LinkItem
      Header={
        <Profile>
          <Link href={href} as={nickname}>
            <div className='profile'>
              <Image src={profileImage} alt='profile' fill />
            </div>
          </Link>
          <Link className='name' href={href}>
            {nickname}
          </Link>
        </Profile>
      }
      {...props}
    />
  );
};

export default LinkWithProfile;
