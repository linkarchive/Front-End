import styled from 'styled-components';
import Image from 'next/image';
import Tag from '@/components/Link/Tag';
import LinkWithProfile from '@/components/Link/LinkWithProfile';

const Link = ({ Header }: { Header?: JSX.Element }) => {
  return (
    <Wrapper>
      <article>
        {Header}
        <div className='info'>
          <div className='contents'>
            <h1 className='title'>제목</h1>
            <p className='domain'>http:werwe</p>
            <p className='desc'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint itaque magnam laborum,
              voluptatibus consequuntur ducimus doloribus est, aut laboriosam atque ipsam blanditiis
              nam vitae aspernatur reiciendis fugit iure, assumenda dolore.
            </p>
          </div>
          <div className='thumb'>
            <a href='/' target='_blank' rel='noreferrer noopener'>
              <Image src='/test.png' alt='' fill />
            </a>
          </div>
        </div>

        <ul className='hashtag-list'>
          <li>
            <Tag />
          </li>
          <li>
            <Tag />
          </li>
        </ul>

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
            32
          </button>
        </div>
      </article>
    </Wrapper>
  );
};

export default Link;
export { Link, LinkWithProfile };

const Wrapper = styled.div`
  padding: 24px 0 16px;
  border-bottom: 1px solid #c8c8c8;

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 0 29px;
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

    padding: 0 29px;

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

  .hashtag-list {
    display: flex;
    flex-wrap: wrap;

    padding: 0 29px;
    margin-bottom: 4px;

    li {
      margin-right: 4px;
      margin-bottom: 4px;
    }
  }
`;
