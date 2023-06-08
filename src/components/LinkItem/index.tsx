import styled from 'styled-components';
import Image from 'next/image';
import LinkItemWithProfile from '@/components/LinkItem/LinkItemWithProfile';
import TagLabelList from '@/components/LinkItem/TagLabelList';
import LinkInfo from '@/components/LinkItem/LinkInfo';
import { LinkItemList, LinkItemWithProfileList } from '@/components/LinkItem/LinkItemLits';
import {
  MetaData,
  LinkItemProps,
  LinkItemWithProfileProps,
  Tag,
  ILinkItem,
  LinkItemListProps,
  ILinksResponse,
} from './LinkItem.type';
import IcoMark from 'public/assets/svg/link.svg';
import { useToggleMark } from '@/hooks/useToggleMark';

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
        <div className='info' onClick={handleLinkClick}>
          <div className='contents'>
            <h1 className='title'>{title}</h1>
            <p className='domain'>{url}</p>
            <p className='desc'>{description}</p>
          </div>
          <div className='thumb'>
            <img src={thumbnail} alt={title} />
          </div>
        </div>

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
      </article>
    </Wrapper>
  );
};

export default LinkItem;
export { LinkItem, LinkItemWithProfile, LinkInfo, LinkItemList, LinkItemWithProfileList };
export type {
  MetaData,
  LinkItemProps,
  LinkItemWithProfileProps,
  Tag,
  ILinkItem,
  LinkItemListProps,
  ILinksResponse,
};

const Wrapper = styled.div`
  padding: 24px 0 16px;
  border-bottom: 1px solid #c8c8c8;

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 30px;

    cursor: pointer;

    .contents {
      width: 223px;

      font-weight: 400;
      font-size: 12px;
      line-height: 14px;

      .title {
        margin-bottom: 6px;

        font-weight: 600;
        font-size: 18px;
        line-height: 21px;
        color: #3a3a3a;
      }

      .domain {
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 8px;

        white-space: nowrap;
        color: #c8c8c8;
      }

      .desc {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;

        color: #a1a1a1;
      }
    }

    .thumb {
      position: relative;

      width: 84px;
      height: 84px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .utils {
    display: flex;
    justify-content: flex-end;

    .read,
    .mark {
      display: flex;
      flex-direction: row;

      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #858585;
    }

    .read {
      margin-right: 8px;
    }

    .mark {
      cursor: pointer;
    }

    .icon {
      position: relative;

      width: 12px;
      height: 12px;
      margin-right: 4px;
    }
  }
`;

const Mark = styled.span<{ isActivated: boolean }>`
  svg path {
    fill: ${({ isActivated }) => (isActivated ? 'var(--svg-color-active)' : '')};
  }
`;
