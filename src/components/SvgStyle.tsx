import styled from 'styled-components';

export const SvgIcon = styled.span`
  svg {
    display: flex;
    justify-content: center;
    margin: auto;
    width: var(--svg-width-xxl);
    height: var(--svg-height-xxl);
    cursor: pointer;
  }
`;

export const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  fill: var(--svg-color-default);

  a {
    width: var(--svg-width-xxl);

    svg {
      &:hover {
        fill: var(--svg-color-hover);
      }
    }
  }
`;
