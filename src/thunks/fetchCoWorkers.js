import { isLoading, hasErrored, getCoWorkers } from '../actions';

export const fetchCoWorkers = () => {
  return async dispatch => {
    const url = 'http://localhost:3001/api/v1/coworkers'
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        return dispatch(hasErrored('There was an error getting your co-workers.'));
      }
      const coWorkers= await response.json();
      dispatch(isLoading(false));
      dispatch(getCoWorkers(coWorkers));
      return coWorkers 
    } catch(error) {
      dispatch(hasErrored(error.message))
    }
  }
}