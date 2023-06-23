import API from '@/api/API';
import { useEffect } from 'react';

const HashTagLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // const response = API.getHashTagList();
    // console.log(response);
  }, []);
  return (
    <>
      <div>hi</div>
      {children}
    </>
  );
};

export default HashTagLayout;
