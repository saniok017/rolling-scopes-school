import { mount } from 'enzyme';
import Table from '../components/Table/Table';

describe('Pages', () => {
  it('should render without throwing an error', () => {
    const wrapper = mount(<Table mentorName={ 'name' } data={{ studentNickName: [] }} tasks={[]} />);
    expect(wrapper.find('Table').text()).toBe('namestudentNickName');
  });
});
