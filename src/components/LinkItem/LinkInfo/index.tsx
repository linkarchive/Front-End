import { Title, URL, Desc, MetaDataWrapper, Thumbnail } from '@/components/LinkItem/MetaData';
import { LinkItemProps } from '@/components/LinkItem/LinkItem.type';
import { InfoWrapper } from '@/components/LinkItem/LinkItem.styled';
import styled from 'styled-components';

type LinkInfoprops = Pick<LinkItemProps, 'linkId' | 'title' | 'url' | 'description' | 'thumbnail'>;

const LinkItemInfoWrapper = styled(InfoWrapper)`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 16px;
  cursor: pointer;
`;

const LinkInfo = ({ ...props }: LinkInfoprops) => {
  const { linkId, title, url, description, thumbnail } = props;

  const handleLinkClick = () => {
    window.open(url, '_blank');
    // eslint-disable-next-line no-console
    console.log(`you ${linkId} clicked!`); // 읽음 api 전송
  };
  return (
    <LinkItemInfoWrapper onClick={handleLinkClick}>
      <MetaDataWrapper>
        <Title>{title}</Title>
        <URL>{url}</URL>
        <Desc>{description}</Desc>
      </MetaDataWrapper>
      <Thumbnail src={thumbnail} alt={title} />
    </LinkItemInfoWrapper>
  );
};

export default LinkInfo;
