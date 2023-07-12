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
        <HashTag tagName='All' onClickTag={handleClickTag} />
        {hashTagList.map((tag) => {
          return <HashTag key={tag.tagId} tagName={tag.tagName} onClickTag={handleClickTag} />;
        })}
      </Wrapper>
      {children}
    </>
  );
};

export default HashTagList;

const Wrapper = styled.div`
  padding: 5px 0 5px 26px;
`;
