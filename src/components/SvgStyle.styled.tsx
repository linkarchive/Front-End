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
    fill: ${({ isActive, theme }) => (isActive ? theme.common.black : theme.gray.lighterGray)};

    cursor: pointer;

    &:hover {
      fill: ${({ theme }) => theme.common.black};
    }
  }
`;

export const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    width: 28px;
  }
`;
