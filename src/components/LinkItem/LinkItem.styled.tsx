import styled from 'styled-components';

const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  color: #a1a1a1;
`;

const Thumb = styled.div`
  position: relative;

  width: 84px;
  height: 84px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LinkContents = styled.div`
  width: 223px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export { Desc, Thumb, LinkContents, InfoWrapper };
