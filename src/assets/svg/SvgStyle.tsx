import styled from 'styled-components';

export const SvgIcon = styled.span`
  svg {
    display: flex;
    justify-content: center;
    margin: auto;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

export const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;

  a {
    width: 24px;
    svg {
      &:hover {
        fill: #4daa7f;
      }
    }
  }
`;
