import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const CreateBtn = () => {
  return (
    <Wrapper>
      <div className='button'>
        <Link href='/'>
          <span>
            <Image src='/assets/svg/add.svg' alt='' width={20} height={20} />
          </span>
        </Link>
      </div>
    </Wrapper>
  );
};

export default CreateBtn;

// TODO 레이아웃 개선
const Wrapper = styled.div`
  position: fixed;
  bottom: 12%;
  left: 55%;
  z-index: 1;
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
