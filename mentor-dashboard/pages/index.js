import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { sortedUniqBy } from 'lodash';
import Select from 'react-select';
import Layout from '../components/Layout';
import Table from '../components/Table';

function getLastUser() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lastSearchedUser');
  }
  return null;
}
// eslint-disable-next-line no-undef
class Index extends React.Component {
  state = {
    currentName: null,
    lastSearchedUser: getLastUser(),
  }


  static async getInitialProps() {
    const options = [];
    let mentors;

    try {
      const response = await fetch(`http://localhost:${process.env.PORT || 3000}/data`);
      const data = await response.json();
      mentors = await sortedUniqBy(data, 'mentorFullName');
      mentors.forEach(
        ({ mentorFullName }) => options.push({ value: mentorFullName, label: mentorFullName }),
      );
    } catch (err) {
      console.log(err);
      mentors = [];
    }

    return { mentors, options };
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('service worker registration successful', registration);
        })
        .catch((err) => {
          console.warn('service worker registration failed', err.message);
        });
    }
  }

  handleChange = (event) => {
    this.setState({ currentName: event.label });
    localStorage.setItem('lastSearchedUser', `${event.label}`);
  };

  render() {
    const { mentors, options } = this.props;
    const { currentName, lastSearchedUser } = this.state;

    if (mentors.length === 0) {
      return <Error />;
    }

    return (
      <Layout title="Mentor-dashboard" description="Rolling scopes school students project made with next.js">
        <h1> Mentors </h1>
        <Select
        options={options}
        onChange={this.handleChange}
         />
         <Table value={currentName || lastSearchedUser} />
      </Layout>
    );
  }
}

export default Index;
