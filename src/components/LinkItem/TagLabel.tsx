import styled from 'styled-components';

const Tag = () => {
  return <Wrapper>태그</Wrapper>;
};

export default Tag;

const Wrapper = styled.div`
  overflow: hidden;

  max-width: 130px;
  height: 22px;
  padding: 3px;

  border-radius: 2px;

  background-color: #ddd;

  color: #fff;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
