import styled from 'styled-components';

const Title = styled.h1<{ color?: string }>`
  width: 100%;

  font-weight: 800;
  font-size: 32px;
  color: ${({ color }) => color || '#3a3a3a'};
`;

export default Title;
