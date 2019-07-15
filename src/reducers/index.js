import { combineReducers } from 'redux';
import { selectedReducer } from './selectedreducer';

export const rootReducer = combineReducers({
  selectedId: selectedReducer
})