import { deleteCoWorker } from './apiCalls';

describe('deleteCoWorker', () => {

  const mockCoWorkers = [
    {
      id: 1,
      image: 'https://image.unsplash.com/1',
      location: 'Pennsylvania',
      name: 'Miguel',
      role: 'Owner',
      status: false
    },
    {
      id: 2,
      image: 'https://image.unsplash.com/2',
      location: 'Colorado',
      name: 'Hailie',
      role: 'Teammate',
      status: true
    }
  ]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCoWorkers)
      });
    });
  });

  it('should call fetch with the correct url and options', () => {
    const id = 2;
    const url = `http://localhost:3001/api/v1/coworkers/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    deleteCoWorker(id);
    expect(window.fetch).toHaveBeenCalledWith(url, options)
  });

  it('should return an array of coWorkers', () => {
    expect(deleteCoWorker(2)).resolves.toEqual(mockCoWorkers);
  });

  it('should return an error if the response isn\'t ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
      });
    });

    expect(deleteCoWorker(2)).rejects.toEqual(Error('There was a problem removing this co-worker.'));
  });

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'));
    });

    expect(deleteCoWorker(2)).rejects.toEqual(Error('fetch failed.'))
  });
});