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
  min-width: 84px;
  width: 84px;
  height: 84px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    font-size: var(--font-size-sm);
  }
`;

const LinkContents = styled.div`
  min-width: 223px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: 317px;
  min-height: 88px;
  margin: 0 auto;
  gap: 10px;
`;

export { Desc, Thumb, LinkContents, InfoWrapper };
