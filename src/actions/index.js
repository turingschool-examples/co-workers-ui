export const selectUser = id => ({
  type: 'SELECT_USER',
  id
})

export const updateLoading = isLoading => ({
  type: 'IS_LOADING',
  isLoading
});

export const hasErrored = errorMsg => ({
  type: 'HAS_ERRORED',
  errorMsg
});

export const setCoWorkers = coWorkers => ({
  type: 'SET_COWORKERS',
  coWorkers
})