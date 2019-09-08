import { combineReducers } from 'redux';
import { selectedId } from './selectedId';
import { isLoading } from './isLoading';
import { errorMsg } from './errorMsg';
import { coWorkers } from './coWorkers';

export const rootReducer = combineReducers({
  selectedId,
  isLoading,
  errorMsg,
  coWorkers,
});