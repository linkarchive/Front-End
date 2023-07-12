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
  const [activeTag, setActiveTag] = useState<string>('All');
  const [hashTagList, setHashTagList] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { name } = useSelector((state: RootState) => state.home);
  const { myNickname } = useSelector((state: RootState) => state.user);

  const userNickname = (router.query.nickname as string) || myNickname;

  const myLink = name === '내 링크';

  const fetchFn = (nickname: string) => {
    return myLink ? API.getUsersLinksTagList(nickname) : API.getUsersMarksTagList(nickname);
  };

  const { data: tagList } = useQuery({
    queryKey: ['tagList', userNickname],
    queryFn: () => fetchFn(userNickname),
  });

  useEffect(() => {
    if (tagList) {
      setHashTagList(tagList);
    }
    return () => setHashTagList([]);
  }, [tagList, name]);

  const handleClickTag = (tagName: string) => {
    dispatch(onClickHashTag({ tagName }));
    setActiveTag(tagName);
  };

  return (
    <>
      <Wrapper>
        <HashTag tagName='All' activeTag={activeTag} onClickTag={handleClickTag} />
        {hashTagList.map((tag) => {
          return (
            <HashTag
              key={tag.tagId}
              tagName={tag.tagName}
              activeTag={activeTag}
              onClickTag={handleClickTag}
            />
          );
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
