import GoBackBtn from '@/components/GoBackBtn';
import styled from 'styled-components';

const Header = () => {
  return (
    <Wrapper>
      <nav>
        {/* FIXME 뒤로가기 버튼 크기 조정 */}
        <GoBackBtn />
        <span className='title'>Header</span>
      </nav>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;

  height: 48px;
  padding: 0 26px;

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .title {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);

    color: --var(--font-color-darkgray);
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
  }
`;
