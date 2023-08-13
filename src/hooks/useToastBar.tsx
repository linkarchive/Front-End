import { useAppDispatch } from '@/store';
import { createToastBar, destroyToastBar, toastBarState } from '@/store/slices/toastBarSlice';
import { useSelector } from 'react-redux';

const useToastBar = () => {
  const dispatch = useAppDispatch();

  const toastState = useSelector(toastBarState);
  const createToastMessage = (text: string) => dispatch(createToastBar({ text }));
  const destroyToastMessage = () => dispatch(destroyToastBar());

  return { toastState, createToastMessage, destroyToastMessage };
};

export default useToastBar;
