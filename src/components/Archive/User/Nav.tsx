import { RootState, useAppDispatch } from '@/store';
import { navSlice } from '@/store/slices/navSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

const Nav = () => {
  const dispatch = useAppDispatch();
  const { userLink } = useSelector((state: RootState) => state.nav);

  useEffect(() => {
    return () => {
      dispatch(navSlice.actions.onClickUserLink());
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <ul className='nav'>
        <Item
          isActive={userLink}
          onClick={() => {
            dispatch(navSlice.actions.onClickUserLink());
          }}
        >
          링크
        </Item>
        <Item
          isActive={!userLink}
          onClick={() => {
            dispatch(navSlice.actions.onClickUserMark());
          }}
        >
          마크
        </Item>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.gray.lightGray};

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    height: 38px;
    list-style: none;
  }
`;

const Item = styled.li<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 72px;
  height: 100%;

  cursor: pointer;

  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.gray.lightGray};

  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 2px solid ${({ theme }) => theme.primary.main};

      color: ${({ theme }) => theme.primary.main};
    `};
`;

export default Nav;
