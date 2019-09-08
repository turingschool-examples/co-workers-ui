export const coWorkers = (state=[], action) => {
  switch(action.type) {
    case 'GET_COWORKERS':
      return action.coWorkers;
    case 'ADD_COWORKER':
      return [...state, action.coWorker];
    case 'REMOVE_COWORKER':
      return state.filter(coWorker => coWorker.id !== action.id)
    default:
      return state;
  }
}