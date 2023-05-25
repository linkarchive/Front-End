import styled from 'styled-components';

interface MetaData {
  title: string;
  thumbnail: string;
  description: string;
}

const LinkInfo = ({ title, thumbnail, description }: MetaData) => {
  return (
    <Wrapper>
      <div className='thumb'>
        <img src={thumbnail} alt='thumb' />
      </div>
      <div className='contents'>
        <p className='desc'>{description}</p>
      </div>
    </Wrapper>
  );
};

export default LinkInfo;
export type { MetaData };

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .thumb {
    display: flex;
    align-items: center;
    justify-content: center;

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
