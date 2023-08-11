import { SearchIcon } from '@/components/svg/Svg';
import React, { useState } from 'react';
import styled from 'styled-components';
import DropBox from './DropBox';
import Spinner from '@/components/Spinner';

const SearchBox = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocus(true);
  };

  const handleInputBlur = () => {
    setIsFocus(false);
    setInputValue('');
  };

  return (
    <Container>
      <Wrapper>
        <Content>
          <InputBox>
            <Input
              placeholder='찾으시는 키워드나 사용자를 입력해보세요!'
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handleChange}
              value={inputValue}
            />
          </InputBox>
          <IconBox>{inputValue ? <Spinner /> : <SearchIcon />}</IconBox>
        </Content>
      </Wrapper>
      {isFocus && <DropBox value={inputValue} />}
    </Container>
  );
};

const Container = styled.div`
  padding: 8px 16px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 343px;
  height: 48px;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.gray.lightBlack};
  border-radius: 10px;
`;

const Content = styled.div`
  display: flex;
  margin: 0 16px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const InputBox = styled.div`
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  width: 100%;

  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;

  ::placeholder {
    color: ${({ theme }) => theme.gray.lighterGray};
  }
`;

const IconBox = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default SearchBox;
