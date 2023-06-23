import styled from 'styled-components';

const Title = styled.h1<{ color?: string }>`
  margin-right: 10px;

  font-weight: 800;
  font-size: 32px;
  color: ${({ color }) => color || '#3a3a3a'};
  cursor: pointer;
`;

export default Title;
