export const selectUser = id => ({
  type: 'SELECT_USER',
  id
})

export const isLoading = isLoading => ({
  type: 'IS_LOADING',
  isLoading
});

export const hasErrored = errorMsg => ({
  type: 'HAS_ERRORED',
  errorMsg
});

export const getCoWorkers = coWorkers => ({
  type: 'GET_COWORKERS',
  coWorkers
})