import styled, { css } from 'styled-components';

const Block = styled.div`
  margin: 0 16px;
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
`;

const TabItemWrapper = styled.span<{ isActive?: boolean }>`
  flex-grow: 1;

  padding: 16px 0;
  border-bottom: 2px solid #f5f5f5;

  color: #a1a1a1;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 130%;

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: #010101;

      color: #010101;
    `};
`;

const TabItem = ({ text, isActive }: { text: string; isActive?: boolean }) => {
  return (
    <TabItemWrapper isActive={isActive}>
      <span>{text}</span>
    </TabItemWrapper>
  );
};

const Tab = () => {
  return (
    <Block>
      <TabWrapper>
        <TabItem text='팔로워' isActive />
        <TabItem text='팔로잉' />
      </TabWrapper>
    </Block>
  );
};

export default Tab;
