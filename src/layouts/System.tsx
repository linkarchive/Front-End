import { useSelector } from 'react-redux';
import { ToastBar } from '@/components/ToastBar';
import { destroyToastBar, toastBarState } from '@/store/slices/toastBarSlice';
import { useAppDispatch } from '@/store';

export const System = () => {
  const dispatch = useAppDispatch();
  const toast = useSelector(toastBarState);

  return <ToastBar {...toast} onToastEnd={() => dispatch(destroyToastBar())} />;
};
