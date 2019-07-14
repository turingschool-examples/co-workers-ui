export const getCoWorkers = async () => {
  const url = 'http://localhost:3001/api/v1/coworkers'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('There was an error getting your co-workers.')
    }
    const { coWorkers } = await response.json()
    return coWorkers 
  } catch(error) {
    throw new Error(error.message);
  }
}