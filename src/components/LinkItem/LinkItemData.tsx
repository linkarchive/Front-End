import styled from 'styled-components';
import { LinkItemProps } from '@/components/LinkItem/LinkItem.type';
import TagLabelList from '@/components/LinkItem/TagLabelList';
import { InfoWrapper, UtilsWrapper, BottomBlock } from '@/components/LinkItem/LinkItem.styled';
import { Title, URL, Desc, MetaDataWrapper } from '@/components/LinkItem/MetaData';
import MarkButton from './MarkButton';
import Thumbnail from './MetaData/Thumbnail';

const Wrapper = styled.article`
  padding: 24px 0 24px;
`;

const LinkItemInfoWrapper = styled(InfoWrapper)`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 16px;
  cursor: pointer;
`;

const LinkItem = ({ queryKey, ...props }: LinkItemProps) => {
  const { linkId, url, title, description, thumbnail, isRead, isMark, bookMarkCount, tagList } =
    props;

  const handleLinkClick = () => {
    window.open(url, '_blank');
    // eslint-disable-next-line no-console
    console.log(`you ${linkId} clicked!`); // 읽음 api 전송
  };

  return (
    <>
      <LinkItemInfoWrapper onClick={handleLinkClick}>
        <MetaDataWrapper>
          <Title>{title}</Title>
          <URL>{url}</URL>
          <Desc>{description}</Desc>
        </MetaDataWrapper>
        <Thumbnail src={thumbnail} alt={title} />
      </LinkItemInfoWrapper>

      <UtilsWrapper>
        <TagLabelList className='tag-list' tags={tagList} />
      </UtilsWrapper>

      <BottomBlock>
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
      </BottomBlock>
    </>
  );
};

export default LinkItem;
