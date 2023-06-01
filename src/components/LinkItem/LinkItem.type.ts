interface ILinkItem {
  title: string;
  thumbnail: string;
  description: string;
  markId?: number;
  linkId: number;
  url: string;
  bookMarkCount: number;
  isRead: boolean;
  tagList: Tag[];
  userId?: string;
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
  tagId: number;
  tagName: string;
}

interface LinkItemProps extends ILinkItem {
  Header?: JSX.Element;
}

interface LinkItemWithProfileProps extends LinkItemProps {}

type ILinksResponse = Record<string, ILinkItem[]>;

interface LinkItemListProps {
  data: ILinksResponse[];
}

export type {
  LinkItemProps,
  LinkItemWithProfileProps,
  Tag,
  MetaData,
  ILinkItem,
  LinkItemListProps,
  ILinksResponse,
};
