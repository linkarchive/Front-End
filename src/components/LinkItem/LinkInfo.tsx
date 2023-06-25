import styled from 'styled-components';
import { Desc, InfoWrapper, LinkMetaWrapper } from '@/components/LinkItem/LinkItem.styled';
import { MetaData } from '@/components/LinkItem/LinkItem.type';
import { Thumbnail } from '@/components/LinkItem/LinkItem';

const LinkInfoWrapper = styled(InfoWrapper)`
  width: 100%;
`;

const LinkInfoMetaWrapper = styled(LinkMetaWrapper)`
  display: flex;
  align-items: center;
`;

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
