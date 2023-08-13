import { LinkItemWithProfileProps } from '@/components/LinkItem';
import styled from 'styled-components';
import Link from 'next/link';
import ProfileImage from '../../Common/User/ProfileImage';

const WriterWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

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
    <WriterWrapper>
      <Link href={linkConfig.href} as={nickname}>
        <ProfileImage src={profileImage} size='40px' />
      </Link>
      <div>
        <Link href={linkConfig.href} as={nickname}>
          <Nickname>{nickname}</Nickname>
        </Link>
        <Date>23분 전</Date>
      </div>
    </WriterWrapper>
  );
};

export default Writer;
