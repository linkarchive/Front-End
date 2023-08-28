import { RootState, useAppDispatch } from '@/store';
import { navSlice } from '@/store/slices/navSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface ContentProps {
  isActive: boolean;
}

const MainTab = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Wrapper>
        <Content onClick={handleLinkClick} isActive={myLink}>
          링크
        </Content>
        <Content onClick={handleMarkClick} isActive={!myLink}>
          마크
        </Content>
        <ActiveBorder isActive={myLink} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.nav`
  padding: 0 16px;
  border-bottom: 2px solid ${({ theme }) => theme.gray.lightBlack};
`;

const ActiveBorder = styled.div<ContentProps>`
  position: absolute;
  bottom: -2px;
  left: ${({ isActive }) => (isActive ? '0' : '64px')};
  width: 49px;
  height: 2px;

  background-color: ${({ theme }) => theme.common.black};
  transition: left 0.3s ease-in-out;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
`;

const Content = styled.span<ContentProps>`
  width: 49px;
  margin-right: 15px;
  padding-bottom: 10px;
  cursor: pointer;

  color: ${({ isActive: myLink, theme }) => (myLink ? theme.common.black : theme.gray.lighterGray)};
  font-weight: 700;
  font-size: 28px;
  line-height: 36.4px;
`;

export default MainTab;
