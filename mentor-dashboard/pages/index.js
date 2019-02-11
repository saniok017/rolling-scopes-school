import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { sortedUniqBy } from 'lodash';
import MentorsList from '../components/mentorsList';
import Layout from "../components/Layout";

class Index extends React.Component {
  static async getInitialProps() {
    let mentors;

    try {
      const response = await fetch(`http://localhost:${process.env.PORT || 3000}/data`);
      const data = await response.json();
      mentors = sortedUniqBy(data, 'mentorFullName');
    } catch (err) {
      console.log(err);
      mentors = [];
    }

    return { mentors };
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful", registration);
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }

  render(){
    const { mentors } = this.props;

    if (mentors.length === 0) {
      return <Error />
    }

    return (
      <Layout title="Mentor-dashboard" description="Rolling scopes school students project made with next.js"> 
        <h1> Mentors </h1>
        <MentorsList mentors={mentors} />
      </Layout>
    )
  }
}

export default Index;
