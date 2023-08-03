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
    width: 28px;
    height: 28px;
    fill: ${({ isActive, theme }) => (isActive ? theme.primary.main : theme.gray.mediumGray)};

    cursor: pointer;

    &:hover {
      fill: ${({ theme }) => theme.primary.main};
    }
  }
`;

export const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;

  a {
    width: 28px;
  }
`;
