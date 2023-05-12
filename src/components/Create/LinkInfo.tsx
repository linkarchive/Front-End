import styled from 'styled-components';
import Image from 'next/image';

const LinkInfo = () => {
  return (
    <Wrapper>
      <div className='thumb'>
        <a href='/' target='_blank' rel='noreferrer noopener'>
          <Image src='/test.png' alt='' fill />
        </a>
      </div>
      <div className='contents'>
        <p className='desc'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint itaque magnam laborum,
          voluptatibus consequuntur ducimus doloribus est, aut laboriosam atque ipsam blanditiis nam
          vitae aspernatur reiciendis fugit iure, assumenda dolore.
        </p>
      </div>
    </Wrapper>
  );
};

export default LinkInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .thumb {
    position: relative;

    width: 84px;
    height: 84px;
    margin-right: 8px;
  }

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
`;
