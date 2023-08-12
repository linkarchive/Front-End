import { Thumb } from '@/components/LinkItem/MetaData/MetaData.steyled';

const Thumbnail = ({ src, alt }: { src: string; alt: string }) => {
  if (!src) return null;
  return (
    <Thumb>
      <img src={src} alt={alt} />
    </Thumb>
  );
};

export default Thumbnail;
