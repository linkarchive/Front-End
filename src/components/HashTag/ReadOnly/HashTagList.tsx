import HashTag from '@/components/HashTag/ReadOnly/HashTag';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { onClickHashTag } from '@/store/slices/hashTagSlice';
import { useSelector } from 'react-redux';
import API from '@/api/API';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import ChevronUpAndDown from '@/components/svg/ChevronDown';

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
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  useEffect(() => {
    if (tagList) {
      setHashTagList(tagList);
    }

    return () => setHashTagList([]);
  }, [tagList, myLink, userLink]);

  return (
    <>
      <Wrapper isButtonClicked={isButtonClicked}>
        <Toggle onClick={handleButtonClick}>
          <ChevronUpAndDown isButtonClicked={isButtonClicked} />
        </Toggle>
        <Content isButtonClicked={isButtonClicked}>
          <HashTag tagName='All' onClickTag={handleClickTag} />
          {hashTagList.map((tag) => {
            return <HashTag key={tag.tagId} tagName={tag.tagName} onClickTag={handleClickTag} />;
          })}
        </Content>
      </Wrapper>
      {children}
    </>
  );
};

export default HashTagList;

const Wrapper = styled.div<{ isButtonClicked: boolean }>`
  position: relative;
  padding: 6px 20px;
  border-bottom: 1px solid #c8c8c8;
  overflow-x: hidden;
  max-height: ${({ isButtonClicked }) => (isButtonClicked ? '100px' : '50px')};

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Toggle = styled.span`
  z-index: 1;
  display: flex;
  position: absolute;
  justify-content: right;
  align-items: center;
  right: 20px;
  padding: 2px;

  background: linear-gradient(to right, rgba(255 255 255 / 0%), rgba(255 255 255 / 100%));

  background-color: #fff;

  svg {
    cursor: pointer;
  }
`;

const Content = styled.div<{ isButtonClicked: boolean }>`
  overflow: hidden;

  padding: 5px 0 5px 10px;

  white-space: ${({ isButtonClicked }) => (isButtonClicked ? 'normal' : 'nowrap')};
  overflow-y: auto;
  max-height: 150px;
`;
