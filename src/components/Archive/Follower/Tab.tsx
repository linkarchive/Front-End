import useTabs from '@/hooks/useFollowerTabs';
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

const TabItem = ({
  text,
  isActive,
  onClick,
}: {
  text: string;
  isActive?: boolean;
  onClick: (e: undefined) => void;
}) => {
  return (
    <TabItemWrapper isActive={isActive} onClick={onClick}>
      <span>{text}</span>
    </TabItemWrapper>
  );
};

interface TabProps {
  tabs: {
    text: string;
  }[];
}

const Tab = ({ tabs }: TabProps) => {
  const { activeItem, handleClick } = useTabs('팔로워');
  return (
    <Block>
      <TabWrapper>
        {tabs.map(({ text }) => (
          <TabItem
            key={text}
            text={text}
            isActive={activeItem === text}
            onClick={() => handleClick(text)}
          />
        ))}
      </TabWrapper>
    </Block>
  );
};

export default Tab;
