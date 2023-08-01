import GoBackBtn from '@/components/Header/GoBackBtn';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Header = () => {
  const name = useSelector((state: RootState) => state.router.name);

  return (
    <Wrapper>
      <nav>
        {/* FIXME: 뒤로가기 버튼 크기 조정 */}
        <GoBackBtn />
        <Title>{name}</Title>
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
`;

const Title = styled.span`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  color: ${({ theme }) => theme.gray.darkGray};
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
`;
