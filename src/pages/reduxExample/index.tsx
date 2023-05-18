import { RootState, useAppDispatch } from '@/store';
import { exampleSlice } from '@/store/slices/exampleSlice';
import React from 'react';
import { useSelector } from 'react-redux';

const { increment, decrement } = exampleSlice.actions;

const Redux = () => {
  const dispatch = useAppDispatch();
  const { val } = useSelector((state: RootState) => state.auth);

  const onIncrement = () => dispatch(increment());
  const onDecrement = () => dispatch(decrement());
  return (
    <>
      <span>{val}</span>
      <button type='button' onClick={onIncrement}>
        +
      </button>
      <button type='button' onClick={onDecrement}>
        -
      </button>
    </>
  );
};

export default Redux;
