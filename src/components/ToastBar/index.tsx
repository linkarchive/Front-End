import { zIndex } from '@/constants/zIndex';
import { ReactNode, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const showTime = 2;

const Wrapper = styled.div<{ show?: boolean }>`
  display: flex;
  position: fixed;
  left: 50%;
  bottom: -62px;
  z-index: ${zIndex.ToastBar};
  align-items: center;
  transform: translateX(-50%);

  padding: 12px 32px;
  box-sizing: border-box;
  border-radius: 40px;
  border: none;

  background: ${({ theme }) => theme.common.black};

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  color: ${({ theme }) => theme.common.white};

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
