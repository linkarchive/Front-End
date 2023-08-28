import { RootState, useAppDispatch } from '@/store';
import { navSlice } from '@/store/slices/navSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Nav = () => {
  const dispatch = useAppDispatch();
  const { userLink } = useSelector((state: RootState) => state.nav);

  useEffect(() => {
    return () => {
      dispatch(navSlice.actions.onClickUserLink());
    };
  }, [dispatch]);

  return (
    <nav>
      <StyledUl>
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
      </StyledUl>
    </nav>
  );
};

const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  height: 38px;
  list-style: none;
`;

const Item = styled.li<{ isActive?: boolean }>`
  /* background-color: aquamarine; */
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid ${({ theme }) => theme.gray.lightBlack};

  width: 100%;
  height: 100%;

  cursor: pointer;

  font-size: 16px;
  line-height: 20.8px;
  color: ${({ theme }) => theme.gray.lightGray};

  ${({ isActive, theme }) =>
    isActive &&
    `
      border-bottom: 2px solid ${theme.common.black};
      color: ${theme.common.black};
    `}
`;

export default Nav;
