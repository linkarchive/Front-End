import { useEffect } from 'react';

const Refresh = () => {
  useEffect(() => {
    window.location.replace('/');
  }, []);

  return <div>화면 조정중</div>;
};

export default Refresh;
