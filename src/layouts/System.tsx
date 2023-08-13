import { ToastBar } from '@/components/ToastBar';
import useToastBar from '@/hooks/useToastBar';

export const System = () => {
  const { toastState, destroyToastMessage } = useToastBar();

  return <ToastBar {...toastState} onToastEnd={destroyToastMessage} />;
};
