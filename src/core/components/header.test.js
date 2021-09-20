import React from "react";
import { Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import { shallow} from 'enzyme';
import { Header } from './header';
import Flight from '@material-ui/icons/Flight';
import Login from './login';
let wrapper;
beforeEach(() => {
    const historyMock = { push: jest.fn() };
    wrapper = shallow(<Header history={historyMock}/>);
    // setup a DOM element as a render target
});

it("renders with Typography", () => {
    expect(wrapper.find(Typography).prop('children')).toBe('MyFlight');
});

it("renders with Toolbar", () => {
    expect(wrapper.find(Toolbar).length).toBe(1);
});

it("renders with App Bar", () => {
    expect(wrapper.find(AppBar).length).toBe(1);
});

it("renders with Icon Button", () => {
    expect(wrapper.find(IconButton).length).toBe(1);
});
it("renders with Flight component", () => {
    expect(wrapper.find(Flight).length).toBe(1);
});
it("renders with Login component", () => {
    expect(wrapper.find(Login).length).toBe(1);
});
it("renders with header component", () => {
    expect(wrapper.find('header').length).toBe(1);
});
it('Test click event', () => {
    const mockCallBack = jest.fn();
    // const button = shallow((<IconButton className="menuButton"  onClick={mockCallBack}></IconButton>));
    wrapper.find(IconButton).simulate('click');
    
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });