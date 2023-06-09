import styled from 'styled-components';
import Image from 'next/image';
import { useToggleMark } from '@/hooks/useToggleMark';
import { LinkItemProps } from '@/components/LinkItem/LinkItem.type';
import TagLabelList from '@/components/LinkItem/TagLabelList';
import IcoMark from 'public/assets/svg/link.svg';
import {
  Desc,
  InfoWrapper,
  LinkMetaWrapper,
  Thumb,
  UtilsWrapper,
} from '@/components/LinkItem/LinkItem.styled';

const Wrapper = styled.div`
  padding: 24px 0 16px;
  border-bottom: 1px solid #c8c8c8;
`;

const LinkItemInfoWrapper = styled(InfoWrapper)`
  margin-bottom: 30px;

  cursor: pointer;

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 6px;

    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    white-space: nowrap;
    color: #3a3a3a;
  }

  .domain {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;

    white-space: nowrap;
    color: #c8c8c8;
  }
`;

const Mark = styled.span<{ isActivated: boolean }>`
  svg path {
    fill: ${({ isActivated }) => (isActivated ? 'var(--svg-color-active)' : '')};
  }
`;

const Thumbnail = ({ src, alt }: { src: string; alt: string }) => {
  if (!src) return null;
  return (
    <Thumb>
      <img src={src} alt={alt} />
    </Thumb>
  );
};

const LinkItem = ({ Header, queryKey, ...props }: LinkItemProps) => {
  const { linkId, url, title, description, thumbnail, isRead, isMark, bookMarkCount, tagList } =
    props;
  const { handleToggleMark } = useToggleMark({ linkId, isMark, queryKey });

  const handleLinkClick = () => {
    window.open(url, '_blank');
    console.log(`you ${linkId} clicked!`); // 읽음 api 전송
  };

  return (
    <Wrapper>
      <article>
        {Header}
        <LinkItemInfoWrapper onClick={handleLinkClick}>
          <LinkMetaWrapper>
            <h1 className='title'>{title}</h1>
            <p className='domain'>{url}</p>
            <Desc>{description}</Desc>
          </LinkMetaWrapper>
          <Thumbnail src={thumbnail} alt={title} />
        </LinkItemInfoWrapper>

        <UtilsWrapper>
          <TagLabelList className='tag-list' tags={tagList} />
          <div className='utils'>
            {isRead && (
              <div className='read'>
                <div className='icon'>
                  <Image src='/assets/svg/check-green.svg' alt='' fill />
                </div>
                읽음
              </div>
            )}
            <button
              className='mark'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                handleToggleMark();
              }}
            >
              <div className='icon'>
                <Mark isActivated={isMark}>
                  <IcoMark />
                </Mark>
              </div>
              {bookMarkCount}
            </button>
          </div>
        </UtilsWrapper>
      </article>
    </Wrapper>
  );
};

export default LinkItem;
export { Thumbnail };
