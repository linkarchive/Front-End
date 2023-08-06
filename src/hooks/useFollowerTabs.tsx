import { RootState, useAppDispatch } from '@/store';
import { followerTabSlice } from '@/store/slices/tabSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useTabs = (init?: string) => {
  const dispatch = useAppDispatch();
  const { activeItem } = useSelector((state: RootState) => state.followerTab);

  useEffect(() => {
    if (!init) return;
    const initTab = () => {
      dispatch(followerTabSlice.actions.onClick(init));
    };
    initTab();

    // eslint-disable-next-line consistent-return
    return () => {
      dispatch(followerTabSlice.actions.onClick(init));
    };
  }, [dispatch, init]);

  const handleClick = (item: string) => dispatch(followerTabSlice.actions.onClick(item));

  return { activeItem, handleClick };
};

export default useTabs;
