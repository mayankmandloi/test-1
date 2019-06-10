import * as React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';
import MovieList from 'components/MovieList';
import Spinner from 'components/Spinner';
// import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount } from 'enzyme';

function render(props) {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(props);

  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  );
}

const setup = () => {
  const reducerWithFetchingState = {
    moviesReducer: {
      isFetching: true,
      items: []
    }
  };

  const reducerWithMovies = {
    moviesReducer: {
      isFetching: false,
      items: [{}, {}]
    }
  };

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(reducerWithMovies);
  return {
    store,
    reducerWithFetchingState,
    reducerWithMovies
  };
};

describe('HomePage tests', () => {
  // it('renders correctly', () => {
  //   const { store } = setup();
  //   const renderer = new ShallowRenderer();
    

  //   renderer.render(
  //     <HomePage store={store} />
  //   );

  //   const result = renderer.getRenderOutput();
  //   expect(result.props.children).toEqual([
  //     <span className="heading">Title</span>,
  //     <MovieList foo="bar" />
  //   ]);
  //   // expect(component).toMatchSnapshot();
  //   // expect(component.find('.homepage-container')).toBe(true)
  // });
  
  it('if loading prop is true, it should show loading div', () => {
    const reducerWithMovies = {
      moviesReducer: {
        isFetching: false,
        items: [{}, {}]
      }
    };
    const reducerWithFetchingState = {
      moviesReducer: {
        isFetching: true,
        items: []
      }
    };
    const wrapper = render(reducerWithFetchingState);
 
    // expect(wrapper.find(<Spinner />).text()).toBe(true)
    expect(wrapper.contains('Spinner').text()).toBe(true);
  });

  // it('if loading prop is true, it should show loading div', () => {
  //   const { mockStore, reducerWithFetchingState } = setup();
  //   const store = mockStore(reducerWithFetchingState);

  //   const wrapper = shallow(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <HomePage />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   expect(wrapper.find('.homepage-container')).toBe(false)
  // });  
});