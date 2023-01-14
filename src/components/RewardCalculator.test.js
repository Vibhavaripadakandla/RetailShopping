import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'isomorphic-fetch';
import RewardCalculator from './RewardCalculator';

Enzyme.configure({ adapter: new Adapter() });



jest.mock('isomorphic-fetch', () => {
  return jest.fn(() => {
    return Promise.resolve({
      json: () => {
        return {
          data: {
            customers: [
              {
                name: "John Doe",
                purchases: [
                  { amount: 150, date: "2022-01-01" },
                  { amount: 200, date: "2022-01-15" },
                ]
              },
              {
                name: "Jane Smith",
                purchases: [
                  { amount: 75, date: "2022-01-10" },
                  { amount: 125, date: "2022-02-01" },
                ]
              }
            ]
          }
        }
      }
    })
  });
});

describe('RewardCalculator', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RewardCalculator />);
  });

  jest.setTimeout(10000);

  it('renders the customer points in a table', () => {
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('table#customers').exists()).toBe(true);
      expect(wrapper.find('tr').length).toBe(3);
      expect(wrapper.find('td').at(0).text()).toEqual('John Doe');
      expect(wrapper.find('td').at(2).text()).toEqual('200');
    }, 1000)
  });
 

  it('renders the monthly points for each customer in a nested table', () => {
    setTimeout(() => {
        wrapper.update();
        expect(wrapper.find('table#monthlyPoints').exists()).toBe(true);
        expect(wrapper.find('table#monthlyPoints tr').length).toBe(2);
        expect(wrapper.find('table#monthlyPoints td').at(0).text()).toEqual('January');
        expect(wrapper.find('table#monthlyPoints td').at(1).text()).toEqual('200 points');
    },1000)
  });
});
