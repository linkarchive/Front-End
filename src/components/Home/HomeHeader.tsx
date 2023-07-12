import styled from 'styled-components';
import Title from '@/components/Title.styled';
import { useState } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { navSlice } from '@/store/slices/navSlice';
import { useSelector } from 'react-redux';

const HomeHeader = () => {
  const { myLink } = useSelector((state: RootState) => state.nav);
  const [isLink, setIsLink] = useState<boolean>(myLink);
  const dispatch = useAppDispatch();

  const handleMarkClick = () => {
    setIsLink(false);
    dispatch(navSlice.actions.onClickMyMark());
  };

  const handleLinkClick = () => {
    setIsLink(true);
    dispatch(navSlice.actions.onClickMyLink());
  };

  return (
    <Wrapper>
      <nav>
        <Title onClick={handleLinkClick} color={!isLink && '#D9D9D9'}>
          내 링크
        </Title>
        <Title onClick={handleMarkClick} color={isLink && '#D9D9D9'}>
          내 마크
        </Title>
      </nav>
    </Wrapper>
  );
};

export default HomeHeader;

export const Wrapper = styled.header`
  nav {
    display: flex;
    align-items: center;

    height: 48px;
    padding: 0 26px;

    > a {
      margin-right: 8px;
    }

    a {
      text-decoration: none;
    }
  }
`;
