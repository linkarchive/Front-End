import styled from 'styled-components';

interface SvgIconProps {
  isActive?: boolean;
  onClick?: () => void;
}

export const SvgIcon = styled.span<SvgIconProps>`
  svg {
    display: flex;
    justify-content: center;
    margin: auto;
    width: var(--svg-width-xxl);
    height: var(--svg-height-xxl);
    fill: ${({ isActive }) => (isActive ? 'var(--svg-color-active)' : 'var(--svg-color-default)')};
    cursor: pointer;

    &:hover {
      fill: var(--svg-color-hover);
    }
  }
`;

export const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;

  a {
    width: var(--svg-width-xxl);
  }
`;
