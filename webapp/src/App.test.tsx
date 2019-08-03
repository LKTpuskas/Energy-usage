import * as React from 'react';
import { shallow } from 'enzyme';
import { BarChart } from 'recharts';

import App from './App';

const electricity = [
  { cumulative: 2,
    readingDate: new Date('02/03/2019'),
    unit: 'kwh'
  }
];

const setup = (extraProps = {}) => {
  const props = {
    ...extraProps
  }
  return {
    props,
    wrapper: shallow(<App {...props}/>)
  }
}

describe('App', () => {
  it('Should render app without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper.length).toBe(1);
  });
  it('meterTableRow should have rendered with 3 children', () => {
    const { wrapper } = setup();
    wrapper.setState({ electricity });
    const meterTableRow = wrapper.findWhere(e => e.props()['data-test'] === 'tablerow').props().children.length
    expect(meterTableRow).toBe(3)
  })
  it('should find BarChart component when electricity has data', () => {
    const { wrapper } = setup();
    wrapper.setState({ electricity });
    const barChart = wrapper.find(BarChart)
    expect(barChart.length).toBe(1)
  });
});
