import styled from 'styled-components';
import { Desc, InfoWrapper, LinkContents } from '@/components/LinkItem/LinkItem.styled';
import { MetaData } from '@/components/LinkItem/LinkItem.type';
import { Thumbnail } from '@/components/LinkItem/LinkItem';

const LinkInfoContents = styled(LinkContents)`
  display: flex;
  align-items: center;
`;

const LinkInfo = ({ metaThumbnail: thumbnail, metaDescription: description }: MetaData) => {
  return (
    <InfoWrapper>
      <LinkInfoContents>
        <Desc>{description}</Desc>
      </LinkInfoContents>
      <Thumbnail src={thumbnail} alt='' />
    </InfoWrapper>
  );
};

export default LinkInfo;
