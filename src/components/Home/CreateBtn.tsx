import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { zIndex } from '@/constants/zIndex';

const CreateBtn = () => {
  return (
    <Wrapper>
      <Link href='/create'>
        <div className='button'>
          <span>
            <Image src='/assets/svg/add.svg' alt='' width={20} height={20} />
          </span>
        </div>
      </Link>
    </Wrapper>
  );
};

export default CreateBtn;

// TODO 레이아웃 개선
const Wrapper = styled.div`
  position: fixed;
  bottom: 12%;
  left: 55%;
  z-index: ${zIndex.CreateBtn};
  transform: translate(100%, 0);

  .button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 64px;
    height: 64px;
    border-radius: 100%;

    background: #4daa7f;

    > span {
      position: relative;
    }
  }
`;
