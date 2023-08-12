import LinkItem, { LinkItemWithProfileProps } from '@/components/LinkItem';
import Writer from './Writer';
import LinkItemInfo from './LinkItemInfo';

const LinkWithProfile = ({ ...props }: LinkItemWithProfileProps) => {
  return (
    <LinkItemInfo>
      <LinkItemInfo.LinkItemHeader>
        <Writer {...props} />
      </LinkItemInfo.LinkItemHeader>
      <LinkItem {...props} />
    </LinkItemInfo>
  );
};

export default LinkWithProfile;
