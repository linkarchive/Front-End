import styled from 'styled-components';
import { Desc } from '@/components/LinkItem/MetaData/MetaData.steyled';
import { MetaData } from '@/components/LinkItem/LinkItem.type';
import Thumbnail from '@/components/LinkItem/MetaData/Thumbnail';
import { InfoWrapper } from '@/components/LinkItem/LinkItem/LinkItem.styled';

const LinkInfoWrapper = styled(InfoWrapper)`
  display: flex;

  width: 100%;
  align-items: center;
  gap: 16px;
`;

const LinkInfoMetaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LinkTitle = styled.p`
  color: ${({ theme }) => theme.gray.mediumGray};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const LinkInfo = ({
  metaThumbnail: thumbnail,
  metaDescription: description,
  metaTitle: title,
}: MetaData) => {
  return (
    <LinkInfoWrapper>
      <Thumbnail src={thumbnail} alt={title} size={72} />
      <LinkInfoMetaWrapper>
        <LinkTitle>{title}</LinkTitle>
        <Desc>{description}</Desc>
      </LinkInfoMetaWrapper>
    </LinkInfoWrapper>
  );
};

export default LinkInfo;
