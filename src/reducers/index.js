import { combineReducers } from 'redux';
import { selectedReducer } from './selectedReducer';
import { isLoading, hasErrored, coWorkers } from './coWorkersReducer';

export const rootReducer = combineReducers({
  selectedId: selectedReducer,
  isLoading,
  errorMsg: hasErrored,
  coWorkers,
});