import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { fetchCoWorkers, postCoWorker, deleteCoWorker } from '../apiCalls';

jest.mock('../apiCalls.js');

describe('App', () => {
  let wrapper
  const mockSetCoWorkers = jest.fn();
  const mockUpdateLoading = jest.fn();
  const mockHasErrored = jest.fn();
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

  fetchCoWorkers.mockImplementation(() => Promise.resolve(mockCoWorkers));
  postCoWorker.mockImplementation(() => Promise.resolve({ id: Date.now() }));
  deleteCoWorker.mockImplementation(() => Promise.resolve([mockCoWorkers[0]]));

  beforeEach(() => {
    wrapper = shallow(<App 
      selectedId={1}
      isLoading={false}
      coWorkers={mockCoWorkers}
      errorMsg={''}
      setCoWorkers={mockSetCoWorkers}
      updateLoading={mockUpdateLoading}
      hasErrored={mockHasErrored}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update loading, fetch coworkers, and setCoWorkers after mounting', () => {
    expect(mockUpdateLoading).toHaveBeenCalledWith(true);
    expect(fetchCoWorkers).toHaveBeenCalled();
    expect(mockUpdateLoading).toHaveBeenCalledWith(false);
    expect(mockSetCoWorkers).toHaveBeenCalledWith(mockCoWorkers);
  });

  it('should update loading, post a coWorker, fetch coWorkers, and setCoWorkers when addCoWorker is called', async () => {
    const mockCoWorker = {
      id: 3,
      image: 'https://images.unsplash.com/3',
      location: 'Colorado',
      name: 'Travis Rollins',
      role: 'Owner',
      status: true
    };
    await wrapper.instance().addCoWorker(mockCoWorker)

    expect(mockUpdateLoading).toHaveBeenCalledWith(true);
    expect(postCoWorker).toHaveBeenCalledWith(mockCoWorker);
    expect(fetchCoWorkers).toHaveBeenCalled();
    expect(mockUpdateLoading).toHaveBeenCalledWith(false);
    expect(mockSetCoWorkers).toHaveBeenCalledWith(mockCoWorkers);
  });

  it('should update loading, delete a coWorker, and setCoWorkers when removeCoWorker is called', async () => {
    const mockEvent = { stopPropagation: jest.fn() };

    await wrapper.instance().removeCoWorker(mockEvent, 2);

    expect(mockUpdateLoading).toHaveBeenCalledWith(true);
    expect(deleteCoWorker).toHaveBeenCalledWith(2);
    expect(mockUpdateLoading).toHaveBeenCalledWith(false);
    expect(mockSetCoWorkers).toHaveBeenCalledWith([mockCoWorkers[0]]);
  })
});
