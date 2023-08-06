import GoBackBtn from '@/components/Common/Header/GoBackBtn';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Header = ({ title }: { title?: string }) => {
  const name = useSelector((state: RootState) => state.router.name);

  return (
    <Wrapper>
      <nav>
        {/* FIXME: 뒤로가기 버튼 크기 조정 */}
        <GoBackBtn />
        <Title>{title || name}</Title>
      </nav>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;

  height: 58px;
  padding: 16px;

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

  color: ${({ theme }) => theme.common.black};
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 26px */
`;
