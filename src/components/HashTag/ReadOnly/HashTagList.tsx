import HashTag from '@/components/HashTag/ReadOnly/HashTag';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { onClickHashTag } from '@/store/slices/hashTagSlice';
import { useSelector } from 'react-redux';
import API from '@/api/API';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { ChevronUpAndDownSvg } from '@/components/svg/Svg';

type HashTagListProps = {
  children: React.ReactNode;
};

export type TagProps = {
  id: number;
  name: string;
};

const HashTagList = ({ children }: HashTagListProps) => {
  const [hashTagList, setHashTagList] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { myLink, userLink } = useSelector((state: RootState) => state.nav);
  const { myId } = useSelector((state: RootState) => state.user);
  const { current } = useSelector((state: RootState) => state.router);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const userId = Number(router.query.userId) || myId;
  const home = current === 'HOME';
  const archive = current === 'ARCHIVE';

  const useLink = home ? myLink : userLink;

  const fetchFn = (id: number) => {
    if (archive) {
      return API.getArchiveTagList();
    }

    if (useLink) {
      return API.getUsersLinksTagList(id);
    }

    if (!useLink) {
      return API.getUsersMarksTagList(id);
    }

    return null;
  };

  const { data: tagList } = useQuery({
    queryKey: ['tagList', myLink, userLink, current, archive],
    queryFn: () => fetchFn(userId),
  });

  const handleClickTag = ({ id, name }: TagProps) => {
    dispatch(onClickHashTag({ tagId: id, tagName: name }));
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
      <Toggle onClick={handleButtonClick}>
        <ChevronUpAndDownSvg isButtonClicked={isButtonClicked} />
      </Toggle>
      <Wrapper isButtonClicked={isButtonClicked}>
        <Content isButtonClicked={isButtonClicked}>
          <HashTag tagId={0} tagName='All' onClickTag={handleClickTag} />
          {hashTagList.map((tag) => {
            return (
              <HashTag
                key={tag.tagId}
                tagId={tag.tagId}
                tagName={tag.tagName}
                onClickTag={handleClickTag}
              />
            );
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
  padding: 4px;
  border-bottom: 8px solid ${({ theme }) => theme.gray.lightBlack};
  overflow-x: hidden;
  max-height: ${({ isButtonClicked }) => (isButtonClicked ? '100px' : '62px')};
  transition: max-height 0.5s ease;

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
  right: 0;
  margin: 6px 20px;

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
