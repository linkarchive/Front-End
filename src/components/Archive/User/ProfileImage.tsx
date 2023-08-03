import Image from 'next/image';
import styled from 'styled-components';

interface ProfileImageProps {
  src: string;
  size: string;
}

const ProfileImage = ({ src, size }: ProfileImageProps) => {
  return (
    <Wrapper size={size}>
      <Image alt='profile_image' src={src} fill />
    </Wrapper>
  );
};

const Wrapper = styled.div<Omit<ProfileImageProps, 'src'>>`
  position: relative;
  overflow: hidden;

  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 100%;
`;

export default ProfileImage;
