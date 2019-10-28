export const coWorkers = (state=[], action) => {
  switch(action.type) {
    case 'SET_COWORKERS':
      return action.coWorkers;
    default:
      return state;
  }
}