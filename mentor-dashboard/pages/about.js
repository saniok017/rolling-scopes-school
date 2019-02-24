import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { sortedUniqBy } from 'lodash';
import MentorsList from '../components/mentorsList';
import Layout from '../components/Layout';

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line no-undef
class about extends React.Component {
  static async getInitialProps() {
    let mentors;
    let logineduser;

    try {
      let response = await fetch(`http://localhost:${PORT}/data`);
      const data = await response.json();
      mentors = sortedUniqBy(data, 'mentorFullName');
      const responseJson = await fetch(`http://localhost:${PORT}/user`);
      response = await responseJson.json();
      if (response.user) logineduser = response.user;
    } catch (err) {
      console.log(err);
      mentors = [];
    }

    return { mentors, logineduser };
  }

  render() {
    const { mentors, logineduser } = this.props;

    if (mentors.length === 0) {
      return <Error />;
    }

    return (
      <Layout title="Mentor-dashboard" description="Rolling scopes school students project made with next.js" user={logineduser}>
        <h1> Rolling scopes school 2018Q3 Mentors-list </h1>
        <MentorsList mentors={mentors} />
      </Layout>
    );
  }
}

export default about;
