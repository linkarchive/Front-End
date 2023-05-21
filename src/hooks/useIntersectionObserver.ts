import { RefObject, useEffect } from 'react';

const useIntersectionObserver = ({
  target,
  onIntersection,
  options,
  enabled,
}: {
  target: RefObject<HTMLDivElement>;
  onIntersection: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
  options?: IntersectionObserverInit;
  enabled?: boolean;
}) => {
  useEffect(() => {
    if (!target.current && !enabled) return;

    const observer = new IntersectionObserver(onIntersection, { ...options });
    observer.observe(target.current as Element);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [enabled, onIntersection, options, target]);

  return target;
};

export default useIntersectionObserver;
