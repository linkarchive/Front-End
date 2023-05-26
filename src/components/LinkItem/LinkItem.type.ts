interface MetaData {
  title: string;
  thumbnail: string;
  description: string;
}
interface LinkItem extends MetaData {
  linkId: number;
  url: string;
  bookMarkCount: number;
  isRead: boolean;
  tagList: Tag[];
}

interface Tag {
  tag: string;
}

interface LinkItemProps extends LinkItem {
  Header?: JSX.Element;
}

interface LinkWithProfileProps extends LinkItemProps {
  userId: number;
  nickname: string;
  profileImage: string;
}

export type { LinkItemProps, LinkWithProfileProps, Tag, MetaData };
