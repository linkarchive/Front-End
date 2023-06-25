import styled from 'styled-components';

const LinkItem = styled.div`
  width: 317px;
  margin: 0 auto;
`;

const InfoWrapper = styled(LinkItem)`
  display: flex;
  flex-direction: row;

  min-height: 84px;
  gap: 10px;
`;

const LinkMetaWrapper = styled.div`
  overflow: hidden;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

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

const UtilsWrapper = styled(LinkItem)`
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

export { Desc, Thumb, LinkMetaWrapper, InfoWrapper, UtilsWrapper };
