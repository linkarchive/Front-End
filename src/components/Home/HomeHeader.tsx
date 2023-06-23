import styled from 'styled-components';
import Title from '@/components/Title.styled';
import { useState } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { homeSlice } from '@/store/slices/homeSlice';
import { useSelector } from 'react-redux';

const HomeHeader = () => {
  const { name } = useSelector((state: RootState) => state.home);
  const [isLink, setIsLink] = useState<boolean>(name === '내 링크');
  const dispatch = useAppDispatch();

  const handleMarkClick = () => {
    setIsLink(false);
    dispatch(homeSlice.actions.onClickMark());
  };

  const handleLinkClick = () => {
    setIsLink(true);
    dispatch(homeSlice.actions.onClickLink());
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
