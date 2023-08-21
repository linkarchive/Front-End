import styled from 'styled-components';
import useInfinityScroll, { IuseInfinityScroll } from '@/hooks/useInfinityScroll';

const Wrapper = styled.div`
  position: relative;
`;

interface InfinityScrollProps extends IuseInfinityScroll {
  renderList: ({ pages }) => JSX.Element;
}

const InfinityScroll = ({
  renderList,
  fetchFn,
  queryKey,
  getNextPageParam,
}: InfinityScrollProps) => {
  const { pages, target, isFetchingNextPage } = useInfinityScroll({
    fetchFn,
    queryKey,
    getNextPageParam,
  });

  return (
    <Wrapper>
      {renderList({ pages })}
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </Wrapper>
  );
};

export default InfinityScroll;
