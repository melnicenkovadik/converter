import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

const actionCreators = {
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};