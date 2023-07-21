import styled from 'styled-components';
import Title from '@/components/Title.styled';
import { RootState, useAppDispatch } from '@/store';
import { navSlice } from '@/store/slices/navSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const HomeHeader = () => {
  const { myLink } = useSelector((state: RootState) => state.nav);
  const dispatch = useAppDispatch();

  const handleMarkClick = () => {
    dispatch(navSlice.actions.onClickMyMark());
  };

  const handleLinkClick = () => {
    dispatch(navSlice.actions.onClickMyLink());
  };

  useEffect(() => {
    return () => {
      dispatch(navSlice.actions.onClickMyLink());
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <nav>
        <Title onClick={handleLinkClick} color={!myLink && '#D9D9D9'}>
          내 링크
        </Title>
        <Title onClick={handleMarkClick} color={myLink && '#D9D9D9'}>
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
