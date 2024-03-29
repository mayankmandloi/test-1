import * as React from 'react';
import Poster from './Poster';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

function render(props) {
  return mount(
    <Poster {...props} />
  );
}

describe("Poster tests", () => {
  const props = {
    showInfo: true,
    id: 213213,
    posterPath: '/movie/53213',
    voteAverage: 123,
    releaseDate: 'Monday 22 April',
    title: 'matrix'
  };

  it("Snapshot test", () => {
    const component = renderer.create(
      <Poster {...props} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders the correct title text", () => {
    const wrapper = render(props);
    const item = wrapper.find(".poster-container__header-title");
    expect(item.text()).toBe(props.title);
  });
  
  it("tests the back button", () => {
    const wrapper = render(props);
    const item = wrapper.find(".poster-container__header-subtitle");
    expect(item.text()).toBe(props.voteAverage + '/10 ' + props.releaseDate.substring(0,4));
  });  
});