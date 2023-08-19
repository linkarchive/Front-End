import { Thumb } from '@/components/LinkItem/MetaData/MetaData.steyled';

const Thumbnail = ({ src, alt, size }: { src: string; alt: string; size?: number }) => {
  if (!src) return null;
  return (
    <Thumb size={size}>
      <img src={src} alt={alt} />
    </Thumb>
  );
};

export default Thumbnail;
