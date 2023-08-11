import GoBackBtn from '@/components/Common/Header/GoBackBtn';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { EllipsisIcon } from '@/components/svg/Svg';

const GoBackHeader = () => {
  const { name, isEllipsis } = useSelector((state: RootState) => state.router);

  return (
    <Wrapper>
      <Nav>
        <GoBackBtn />
        <Title>{name}</Title>
        <EllipsisIconBox isVisible={isEllipsis}>
          <EllipsisIcon />
        </EllipsisIconBox>
      </Nav>
    </Wrapper>
  );
};

export default GoBackHeader;

const Wrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;

  height: 58px;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const EllipsisIconBox = styled.nav<{ isVisible: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  > svg {
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  }
`;

const Title = styled.span`
  color: ${({ theme }) => theme.common.black};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 26px */
`;
