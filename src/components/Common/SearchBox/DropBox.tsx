import { CircleXMark } from '@/components/svg/Svg';
import styled from 'styled-components';

const dummyData = [
  {
    id: 0,
    recentSearchName: '프론트엔드',
  },
  {
    id: 1,
    recentSearchName: '백엔드',
  },
  {
    id: 2,
    recentSearchName: '디자인',
  },
  {
    id: 3,
    recentSearchName: '개발',
  },
  {
    id: 4,
    recentSearchName: '취업',
  },
];

const DropBox = ({ value }: { value: string }) => {
  return (
    <Container>
      <Wrapper>
        <Content>
          {value ? (
            <RecentSearches>{value}</RecentSearches>
          ) : (
            <RecentGroup>
              <RecentTitle>최근 검색어</RecentTitle>
              {dummyData.map((data) => {
                return (
                  <RecentSearches key={data.id}>
                    <span>{data.recentSearchName}</span>
                    <CircleXMark background='#f5f5f5' fill='#555555' />
                  </RecentSearches>
                );
              })}
            </RecentGroup>
          )}
        </Content>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  z-index: 2;
  position: absolute;
  margin-top: 5px;
  width: 343px;
  height: 200px;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.gray.lightBlack};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  position: relative;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
`;

const RecentGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecentTitle = styled.div`
  margin-bottom: 8px;

  font-size: 14px;
  font-weight: 500;
`;

const RecentSearches = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  margin: 1px 0;
  padding: 5px 0;
  justify-content: space-between;

  border-bottom: 1px solid ${({ theme }) => theme.gray.lighterGray};

  font-size: 12px;
  font-weight: 500;
`;
export default DropBox;
