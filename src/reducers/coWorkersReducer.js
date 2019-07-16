export const isLoading = (state=false, action) => {
  switch(action.type) {
    case 'IS_LOADING':
      return action.isLoading
    default:
      return state;
  }
}

export const hasErrored = (state = '', action) => {
  switch(action.type) {
    case 'HAS_ERRORED':
      return action.errorMsg
    default:
      return state;
  }
}

export const coWorkers = (state=[], action) => {
  switch(action.type) {
    case 'GET_COWORKERS':
      return action.coWorkers;
    default:
      return state;
  }
}