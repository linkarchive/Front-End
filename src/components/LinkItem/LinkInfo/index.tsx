import { Title, URL, Desc, MetaDataWrapper, Thumbnail } from '@/components/LinkItem/MetaData';
import { LinkItemProps } from '@/components/LinkItem/LinkItem.type';
import { InfoWrapper } from '@/components/LinkItem/LinkItem/LinkItem.styled';
import styled from 'styled-components';
import HashTagList from '@/components/Common/Tag/HashTagList';
import HashTag from '@/components/Common/Tag/HashTag';
import LinkItemInfo from '@/components/LinkItem/LinkItemInfo';

type LinkInfoprops = Pick<
  LinkItemProps,
  'linkId' | 'title' | 'url' | 'description' | 'thumbnail' | 'tagList'
>;

const LinkInfoWrapper = styled(InfoWrapper)`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 16px;

  cursor: pointer;
`;

const LinkInfo = ({ ...props }: LinkInfoprops) => {
  const { linkId, title, url, description, thumbnail, tagList } = props;

  const handleLinkClick = () => {
    window.open(url, '_blank');
    // eslint-disable-next-line no-console
    console.log(`you ${linkId} clicked!`); // 읽음 api 전송
  };
  return (
    <>
      <LinkInfoWrapper onClick={handleLinkClick}>
        <MetaDataWrapper>
          <Title>{title}</Title>
          <URL>{url}</URL>
          <Desc>{description}</Desc>
        </MetaDataWrapper>
        <Thumbnail src={thumbnail} alt={title} />
      </LinkInfoWrapper>
      <LinkItemInfo.Header />
      <LinkItemInfo.HashTagBlock>
        <HashTagList
          tagList={tagList}
          TagComponent={HashTag}
          // eslint-disable-next-line no-console
          handleClick={(tag) => console.log(tag.tagName)} // tag 클릭시 상호작용 추가?
        />
      </LinkItemInfo.HashTagBlock>
    </>
  );
};

export default LinkInfo;
