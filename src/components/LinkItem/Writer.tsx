import { LinkItemWithProfileProps } from '@/components/LinkItem';
import styled from 'styled-components';
import Link from 'next/link';
import ProfileImage from '../Common/User/ProfileImage';

const Box = styled.div``;

const Nickname = styled.span`
  color: ${({ theme }) => theme.common.black};

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.gray.lightGray};

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const Writer = ({ ...props }: LinkItemWithProfileProps) => {
  const { nickname, profileImage, userId } = props;

  const linkConfig = {
    href: {
      pathname: `${nickname}`,
      query: { userId },
    },
  };

  return (
    <>
      <Link href={linkConfig.href} as={nickname}>
        <ProfileImage src={profileImage} size='40px' />
      </Link>
      <Box>
        <Link href={linkConfig.href} as={nickname}>
          <Nickname>{nickname}</Nickname>
        </Link>
        <Date>23분 전</Date>
      </Box>
    </>
  );
};

export default Writer;
