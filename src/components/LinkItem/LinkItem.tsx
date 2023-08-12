import { LinkItemProps } from '@/components/LinkItem/LinkItem.type';
import TagLabelList from '@/components/LinkItem/TagLabelList';
import { UtilsWrapper } from '@/components/LinkItem/LinkItem.styled';
import MarkButton from './MarkButton';
import LinkItemInfo from './LinkItemInfo';
import LinkInfo from '@/components/LinkItem/LinkInfo';

const LinkItem = ({ queryKey, ...props }: LinkItemProps) => {
  const { linkId, isRead, isMark, bookMarkCount, tagList } = props;

  return (
    <LinkItemInfo>
      <LinkInfo {...props} />
      <UtilsWrapper>
        <TagLabelList className='tag-list' tags={tagList} />
      </UtilsWrapper>

      <LinkItemInfo.LinkItemBottom>
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
      </LinkItemInfo.LinkItemBottom>
    </LinkItemInfo>
  );
};

export default LinkItem;
