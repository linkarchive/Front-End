import HashTag from '@/components/HashTag/ReadOnly/HashTag';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { onClickHashTag } from '@/store/slices/hashTagSlice';
import { useSelector } from 'react-redux';
import API from '@/api/API';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

type HashTagListProps = {
  children: React.ReactNode;
};

const HashTagList = ({ children }: HashTagListProps) => {
  const [hashTagList, setHashTagList] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { myLink, userLink } = useSelector((state: RootState) => state.nav);
  const { myNickname } = useSelector((state: RootState) => state.user);
  const { current } = useSelector((state: RootState) => state.router);

  const userNickname = (router.query.nickname as string) || myNickname;
  const home = current === 'HOME';

  const useLink = home ? myLink : userLink;

  const fetchFn = (nickname: string) => {
    return useLink ? API.getUsersLinksTagList(nickname) : API.getUsersMarksTagList(nickname);
  };

  const { data: tagList } = useQuery({
    queryKey: ['tagList', userNickname, myLink, userLink, current],
    queryFn: () => fetchFn(userNickname),
  });

  const handleClickTag = (tagName: string) => {
    dispatch(onClickHashTag({ tagName }));
  };

  useEffect(() => {
    if (tagList) {
      setHashTagList(tagList);
    }

    return () => setHashTagList([]);
  }, [tagList, myLink, userLink]);

  return (
    <>
      <Wrapper>
        <Content>
          <HashTag tagName='All' onClickTag={handleClickTag} />
          {hashTagList.map((tag) => {
            return <HashTag key={tag.tagId} tagName={tag.tagName} onClickTag={handleClickTag} />;
          })}
        </Content>
        <Blank>전체보기</Blank>
      </Wrapper>
      {children}
    </>
  );
};

export default HashTagList;

const Wrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid #c8c8c8;
  overflow-x: hidden;
`;

const Blank = styled.div`
  padding-top: 6px;
  margin-right: 10px;

  text-align: right;
  font-size: 14px;
  color: var(--font-color-darkgray);

  cursor: pointer;
`;

const Content = styled.div`
  padding: 5px 0 5px 10px;

  white-space: nowrap;
`;
