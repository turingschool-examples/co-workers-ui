export const getCoWorkers = async () => {
  const url = 'http://localhost:3001/api/v1/coworkers'
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was an error getting your co-workers.');
  }
  const coWorkers = await response.json();
  return coWorkers
}

export const createCoWorker = async newCoWorker => {
  const url = 'http://localhost:3001/api/v1/coworkers';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...newCoWorker })
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Sorry.  Unable to create your new co-worker.');
  }
  const newCoWorkerId = await response.json();
  return newCoWorkerId;
}

export const deleteCoWorker = async id => {
  const url = `http://localhost:3001/api/v1/coworkers/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('There was a problem removing this co-worker.')
  }
}