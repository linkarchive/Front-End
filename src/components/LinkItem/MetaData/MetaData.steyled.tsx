import styled from 'styled-components';

const MetaDataWrapper = styled.div`
  overflow: hidden;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

const Title = styled.h1`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;

  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  color: ${({ theme }) => theme.common.black};
  font-style: normal;
  line-height: 130%; /* 20.8px */
`;

const URL = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;

  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
  line-height: 130%; /* 15.6px */
  color: ${({ theme }) => theme.gray.lightGray};
`;

const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 14px;
  font-weight: 500;
  line-height: 130%; /* 18.2px */
  color: ${({ theme }) => theme.gray.darkGray};
  word-break: break-all;
`;

const Thumb = styled.div`
  position: relative;
  overflow: hidden;

  min-width: 80px;
  width: 80px;
  height: 80px;

  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    font-size: 10px;
  }
`;

export { MetaDataWrapper, Title, URL, Desc, Thumb };
