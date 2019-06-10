import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import MovieDetailPage from './MovieDetailPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const setup = () => {
  const initialState = {
  };

  const mockStore = configureStore();

  return {
    initialState,
    mockStore,
  };
};
describe('MovieDetailPage tests', () => {
  it('renders correctly', () => {
    const { initialState, mockStore, props } = setup();
    const store = mockStore(initialState);
  
    const renderedComponent = shallow(<Provider store={store}><MovieDetailPage {...props} /></Provider>);
    expect(renderedComponent).toMatchSnapshot()
  });  
});