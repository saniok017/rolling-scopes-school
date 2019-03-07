import { mount, shallow } from 'enzyme';
import Select from 'react-select';
import Table from '../components/Table/Table';
import About from '../pages/about';
import Index from '../pages/index';

const object = {
  mentorGitHub: '',
  mentorFullName: '',
};


describe('Components', () => {
  it('should render Table without throwing an error', () => {
    const wrapper = mount(<Table mentorName={ 'name' } data={{ studentNickName: [] }} tasks={[]} />);
    expect(wrapper.find('Table').text()).toBe('namestudentNickName');
  });
  it('should render Select without throwing an error', () => {
    const wrapper = shallow(<Select options={[]} />);
    expect(wrapper.find('Select').text()).toBe('<Select />');
  });
  it('should render About without throwing an error', () => {
    const wrapper = shallow(<About mentors={ [object] } />);
    expect(wrapper.find('h1').text()).toBe(' Rolling scopes school 2018Q3 Mentors-list ');
  });
});

describe('Index initial props', () => {
  let wrapper;
  beforeEach(async () => {
    const props = await Index.getInitialProps({ query: { logineduser: 'me' } });
    wrapper = mount(<Select options={props.options.options} />);
  });

  it('getInitialProps async test', () => {
    expect(wrapper.find('Select').prop('options').length).toBe(135);
  });

  it('getInitialProps async test', () => {
    expect(wrapper.find('Select').prop('options')[0].value).toBe('ALIAKSEI KRAUCHANKA');
  });
});
