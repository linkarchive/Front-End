import styled, { css } from 'styled-components';

const Nav = () => {
  return (
    <Wrapper>
      <ul className='nav'>
        <Item isActive>링크</Item>
        <Item>마크</Item>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  box-sizing: border-box;
  border-bottom: 1px solid var(--font-color-lightgray);

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
  color: var(--font-color-lightgray);

  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 2px solid var(--font-color-primary);

      color: var(--font-color-primary);
    `};
`;

export default Nav;
