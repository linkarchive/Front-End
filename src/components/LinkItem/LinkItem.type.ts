interface ILinkItem {
  title: string;
  thumbnail: string;
  description: string;
  linkId: number;
  url: string;
  bookMarkCount: number;
  isRead: boolean;
  tagList: Tag[];
  userId?: number;
  nickname?: string;
  profileImage?: string;
}

interface MetaData {
  metaDescription: string;
  metaThumbnail: string;
  metaTitle: string;
  titleText: string;
}

interface Tag {
  tag: string;
}

interface LinkItemProps extends ILinkItem {
  Header?: JSX.Element;
}

interface LinkItemWithProfileProps extends LinkItemProps {}

export type { LinkItemProps, LinkItemWithProfileProps, Tag, MetaData, ILinkItem };
