import API from '@/api/API';
import SearchBox from '@/components/Common/SearchBox/SearchBox';
import MainTab from '@/components/Common/Tab/MainTab';
import { Tag } from '@/components/Common/Tag/BaseTag';
import FilteringTag from '@/components/Common/Tag/FilteringTag';
import HashTagList from '@/components/Common/Tag/HashTagList';
import { ChevronUpAndDownSvg } from '@/components/svg/Svg';
import { RootState, useAppDispatch } from '@/store';
import { onClickHashTag } from '@/store/slices/hashTagSlice';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type LinkItemListLayoutProps = {
  children: ReactElement;
};

const LinkItemListLayout = ({ children }: LinkItemListLayoutProps) => {
  const [hashTagList, setHashTagList] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { myLink, userLink } = useSelector((state: RootState) => state.nav);
  const { myId } = useSelector((state: RootState) => state.user);
  const { current } = useSelector((state: RootState) => state.router);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const userId = Number(router.query.userId) || myId;
  const HOME_PAGE = current === 'HOME_PAGE';
  const ARCHIVE_PAGE = current === 'ARCHIVE_PAGE';
  const USER_LINK = HOME_PAGE ? myLink : userLink;

  const { data: tagList } = useQuery({
    queryKey: ['tagList', myLink, userLink, current, ARCHIVE_PAGE],
    queryFn: () => fetchFn(userId),
  });

  const fetchFn = (id: number) => {
    if (ARCHIVE_PAGE) {
      return API.getArchiveTagList();
    }

    if (USER_LINK) {
      return API.getUsersLinksTagList(id);
    }

    if (!USER_LINK) {
      return API.getUsersMarksTagList(id);
    }

    return null;
  };

  const handleClickTag = ({ tagId, tagName }: Tag) => {
    dispatch(onClickHashTag({ tagId, tagName }));
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
      {HOME_PAGE && <MainTab />}
      {ARCHIVE_PAGE && <SearchBox />}
      <Wrapper>
        <Toggle>
          <ChevronUpAndDownSvg isButtonClicked={isButtonClicked} onClick={handleButtonClick} />
        </Toggle>
        <TagGroup isButtonClicked={isButtonClicked}>
          <TagBox isButtonClicked={isButtonClicked}>
            <HashTagList
              tagList={hashTagList}
              handleClick={handleClickTag}
              TagComponent={FilteringTag}
            />
          </TagBox>
        </TagGroup>
      </Wrapper>
      {children}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const TagGroup = styled.div<{ isButtonClicked: boolean }>`
  position: relative;
  max-height: ${({ isButtonClicked }) => (isButtonClicked ? '135px' : '55px')};
  padding: 4px;
  border-bottom: 8px solid ${({ theme }) => theme.gray.lightBlack};
  overflow-x: hidden;
  transition: height 0.5s ease;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TagBox = styled.div<{ isButtonClicked: boolean }>`
  padding: 5px 0 5px 10px;

  > div {
    flex-wrap: wrap;
    overflow: hidden;
  }

  max-height: 150px;
`;

const Toggle = styled.span`
  z-index: 1;
  position: absolute;
  display: flex;
  right: 0;
  width: 50px;
  justify-content: right;
  padding: 0 10px;
  margin: 8px 0;

  background-color: #fff;

  svg {
    cursor: pointer;
  }
`;

export default LinkItemListLayout;
