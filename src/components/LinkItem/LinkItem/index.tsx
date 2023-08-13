import { LinkItemProps } from '@/components/LinkItem/LinkItem.type';
import MarkButton from '@/components/LinkItem/Button/MarkButton';
import LinkItemInfo from '@/components/LinkItem/LinkItemInfo';
import LinkInfo from '@/components/LinkItem/LinkInfo';

const LinkItem = ({ queryKey, ...props }: LinkItemProps) => {
  const { linkId, isRead, isMark, bookMarkCount } = props;

  return (
    <LinkItemInfo>
      <LinkItemInfo.LinkInfoBlock>
        <LinkInfo {...props} />
        <LinkItemInfo.Bottom>
          {/** TODO 디자인 미정
              {isRead && (
                <div className='read'>
                  <div className='icon'>
                    <Image src='/assets/svg/check-green.svg' alt='' fill />
                  </div>
                  읽음
                </div>
              )}
               */}
          <MarkButton
            linkId={linkId}
            queryKey={queryKey}
            isMark={isMark}
            bookMarkCount={bookMarkCount}
          />
        </LinkItemInfo.Bottom>
      </LinkItemInfo.LinkInfoBlock>
      <LinkItemInfo.BorderBottom />
    </LinkItemInfo>
  );
};

export default LinkItem;
