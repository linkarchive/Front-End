interface LinkItem {
  urlId: number;
  link: string;
  title: string;
  description: string;
  thumbnail: string;
  bookMarkCount: number;
  tagList: Tag[];
}

interface Tag {
  tag: unknown; // TODO 개선필요
}

interface LinkItemProps extends LinkItem {
  Header?: JSX.Element;
}

interface LinkWithProfileProps extends LinkItemProps {
  userId: number;
  name: string;
  profileImage: string;
}

export type { LinkItemProps, LinkWithProfileProps, Tag };
