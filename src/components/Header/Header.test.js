import * as React from 'react';
import Header from './Header';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

function render(props) {
  return mount(
    <Header {...props} />
  );
}
describe("Header tests", () => {
  const propsInHomePage = {
    history: {
      goBack: jest.fn(),
      location: {
        pathname: '/'
      }
    }
  };

  const propsInMovieDetails = {
    history: {
      goBack: jest.fn(),
      location: {
        pathname: '/movie/4213'
      }
    }
  };

  it("Snapshot in homepage test", () => {
    const component = renderer.create(
      <Header {...propsInHomePage} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Snapshot in movie detail page test", () => {
    const component = renderer.create(
      <Header {...propsInMovieDetails} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders the correct title text", () => {
    const wrapper = render(propsInHomePage);
    const item = wrapper.find(".header__app-title");
    expect(item.text()).toBe("MOOVIE IT MOVIE CHALLENGE");
  });

  // it("tests that back button should not appear in homepage", () => {
  //   const wrapper = render(propsInHomePage);
  //   expect(wrapper.find('.header__back-button').isEmpty()).to.equal(true);
  // });  

  // it("tests that back button should appear in movie details page", () => {
  //   const wrapper = render(propsInMovieDetails);
  //   expect(wrapper.find('.header__back-button').text()).toBe(1);
  // });  
  it("tests the back button", () => {
    const wrapper = render(propsInMovieDetails);
    wrapper.find('.header__back-button').simulate('click');
    expect(propsInMovieDetails.history.goBack.mock.calls.length).toBe(1);
  });  
});