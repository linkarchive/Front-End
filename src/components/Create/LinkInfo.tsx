import styled from 'styled-components';
import { Desc } from '@/components/LinkItem/MetaData/MetaData.steyled';
import { MetaData } from '@/components/LinkItem/LinkItem.type';
import Thumbnail from '@/components/LinkItem/MetaData/Thumbnail';
import { InfoWrapper } from '@/components/LinkItem/LinkItem/LinkItem.styled';

const LinkInfoWrapper = styled(InfoWrapper)`
  width: 100%;
`;

const LinkInfoMetaWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// TODO 디자인 수정
const LinkInfo = ({ metaThumbnail: thumbnail, metaDescription: description }: MetaData) => {
  return (
    <LinkInfoWrapper>
      <LinkInfoMetaWrapper>
        <Desc>{description}</Desc>
      </LinkInfoMetaWrapper>
      <Thumbnail src={thumbnail} alt='' />
    </LinkInfoWrapper>
  );
};

export default LinkInfo;
