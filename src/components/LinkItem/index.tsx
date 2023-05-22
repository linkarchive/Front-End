import styled from 'styled-components';
import Image from 'next/image';
import LinkItemWithProfile from '@/components/LinkItem/LinkItemWithProfile';
import TagLabelList from '@/components/LinkItem/TagLabelList';
import { LinkItemProps, LinkWithProfileProps, Tag } from './LinkItem.type';

const LinkItem = ({ Header, ...props }: LinkItemProps) => {
  const { urlId, link, title, description, thumbnail, bookMarkCount, tagList } = props;

  return (
    <Wrapper>
      <article>
        {Header}
        <div className='info'>
          <div className='contents'>
            <h1 className='title'>{title}</h1>
            <p className='domain'>{link}</p>
            <p className='desc'>{description}</p>
          </div>
          <div className='thumb'>
            <a href='/' target='_blank' rel='noreferrer noopener'>
              <img src={thumbnail} alt={title} />
            </a>
          </div>
        </div>

        <TagLabelList className='tag-list' tags={tagList} />

        <div className='utils'>
          <div className='read'>
            <div className='icon'>
              <Image src='/assets/svg/check-green.svg' alt='' fill />
            </div>
            읽음
          </div>
          <button className='mark' type='button'>
            <div className='icon'>
              <Image src='/assets/svg/link.svg' alt='' fill />
            </div>
            {bookMarkCount}
          </button>
        </div>
      </article>
    </Wrapper>
  );
};

export default LinkItem;
export { LinkItem, LinkItemWithProfile };
export type { LinkItemProps, LinkWithProfileProps, Tag };

const Wrapper = styled.div`
  padding: 24px 0 16px;
  border-bottom: 1px solid #c8c8c8;

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 30px;

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
        margin-bottom: 8px;

        color: #c8c8c8;
      }

      .desc {
        overflow: hidden;

        height: 33px;

        color: #a1a1a1;
        text-overflow: ellipsis;
      }
    }

    .thumb {
      position: relative;

      width: 84px;
      height: 84px;
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

    .icon {
      position: relative;

      width: 12px;
      height: 12px;
      margin-right: 4px;
    }
  }
`;
