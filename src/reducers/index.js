import { combineReducers } from 'redux';
import { selectedId } from './selectedId';
import { coWorkers } from './coWorkers';
import { isLoading } from './isLoading';
import { errorMsg } from './errorMsg';

export const rootReducer = combineReducers({
  selectedId,
  coWorkers,
  isLoading,
  errorMsg,
});