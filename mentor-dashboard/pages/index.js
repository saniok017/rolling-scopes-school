import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Table from '../components/Table/Table';


const PORT = process.env.PORT || 3000;

function getLastUser() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lastSearchedUser');
  }
  return null;
}

async function getTableData(name) {
  const response = await fetch(`http://localhost:${PORT}/tableData/${name}`);
  const tableData = await response.json();

  return tableData;
}

// eslint-disable-next-line no-undef
class Index extends React.Component {
  state = {
    currentName: null,
    lastSearchedUser: getLastUser(),
    tableData: this.props.tableData,
  }

  static async getInitialProps(context) {
    let { logineduser, loginedMentor } = context.query;
    let options;

    try {
      let response = await fetch(`http://localhost:${PORT}/data/options`);
      options = await response.json();
      if (!logineduser) {
        const responseJson = await fetch(`http://localhost:${PORT}/user`);
        response = await responseJson.json();
        if (response.user) logineduser = response.user;
        if (response.mentor) loginedMentor = response.mentor;
      }
    } catch (err) {
      console.log(err);
      options = [];
    }

    return {
      options,
      loginedMentor,
      logineduser,
    };
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

    getTableData(this.props.loginedMentor || this.state.lastSearchedUser)
      .then(Response => this.setState({ tableData: Response }))
      .catch(error => console.warn(error));
  }

  handleChange = (event) => {
    getTableData(event.label)
      .then(Response => this.setState({ currentName: event.label, tableData: Response }));
    localStorage.setItem('lastSearchedUser', `${event.label}`);
  };

  render() {
    const { currentName, lastSearchedUser, tableData } = this.state;
    const {
      options,
      loginedMentor,
      logineduser,
    } = this.props;

    if (options.length === 0) {
      return <Error />;
    }

    return (
      <Layout title='Mentor-dashboard' description='Rolling scopes school students project made with next.js' user={logineduser}>
        <h1 style={{ width: '1200px', marginLeft: '38%', marginRight: 'auto' }}> Mentor-dashboard </h1>
        <Select
        options={options.options}
        onChange={this.handleChange}
         />
         <Table
          mentorName={currentName || loginedMentor || lastSearchedUser}
          data={tableData}
          tasks={options.tasks}
          />
      </Layout>
    );
  }
}

Index.defaultProps = {
  tableData: {
    studentNickName: ['task', 'task'],
  },
};

Index.propTypes = {
  tableData: PropTypes.object.isRequired,
};

export default Index;
