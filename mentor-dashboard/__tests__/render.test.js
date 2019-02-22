import { mount } from 'enzyme';
import Select from 'react-select';
import Table from '../components/Table/Table';
import About from '../pages/about';

const object = {
  mentorGitHub: '',
  mentorFullName: '',
};


describe('Components', () => {
  it('should render without throwing an error', () => {
    const wrapper = mount(<Table mentorName={ 'name' } data={{ studentNickName: [] }} tasks={[]} />);
    expect(wrapper.find('Table').text()).toBe('namestudentNickName');
  });
  it('should render without throwing an error', () => {
    const wrapper = mount(<Select options={[]} />);
    expect(wrapper.find('Select').text()).toBe('Select...');
  });
  it('should render without throwing an error', () => {
    const wrapper = mount(<About mentors={ [object] } />);
    expect(wrapper.find('h1').text()).toBe(' Rolling scopes school 2018Q3 Mentors-list ');
  });
});
