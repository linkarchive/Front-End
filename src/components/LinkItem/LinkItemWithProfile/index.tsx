import { LinkItemWithProfileProps } from '@/components/LinkItem';
import Writer from '@/components/LinkItem/LinkItemWithProfile/Writer';
import LinkItemInfo from '@/components/LinkItem/LinkItemInfo';
import LinkItem from '@/components/LinkItem/LinkItem';
import MoreButton from '@/components/LinkItem/Button/MoreButton';

const LinkItemWithProfile = ({ ...props }: LinkItemWithProfileProps) => {
  return (
    <LinkItemInfo>
      <LinkItemInfo.Header>
        <Writer {...props} />
        <MoreButton />
      </LinkItemInfo.Header>
      <LinkItem {...props} />
    </LinkItemInfo>
  );
};

export default LinkItemWithProfile;
