import { ReactNode, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const showTime = 2;

const Wrapper = styled.div<{ show?: boolean }>`
  display: flex;
  position: fixed;
  left: 50%;
  bottom: -62px;
  z-index: 2;
  align-items: center;
  transform: translateX(-50%);

  width: 343px;
  height: 62px;
  box-sizing: border-box;
  padding: 0 23px;
  border-radius: 6px;
  border: none;

  background: var(--toast-background);

  font-weight: 600;
  font-size: 18px;
  color: var(--font-color-white);

  transition: all ${showTime}s;

  ${({ show }) =>
    show &&
    css`
      bottom: 120px;
    `};
`;

export const ToastBar = ({
  text,
  children,
  show: initShow,
  onToastEnd,
}: {
  text?: string;
  children?: ReactNode;
  show: boolean;
  onToastEnd?: (show: boolean) => void;
}) => {
  const [show, setShow] = useState(initShow);

  useEffect(() => {
    if (initShow) {
      setShow(true);
    }
  }, [initShow]);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow((prev) => !prev);
      onToastEnd && onToastEnd(false);
    }, showTime * 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [onToastEnd, show]);

  return <Wrapper show={show}>{text || children}</Wrapper>;
};
