import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { sortedUniqBy } from 'lodash';
import MentorsList from '../components/mentorsList';

class Index extends React.Component {
  static async getInitialProps() {
    let mentors;

    try {
      const response = await fetch('http://127.0.0.1:3001/data');
      const data = await response.json();
      mentors = sortedUniqBy(data, 'mentorFullName');
    } catch (err) {
      console.log(err);
      mentors = [];
    }

    return { mentors };
  }

  render(){
    const { mentors } = this.props;

    if (mentors.length === 0) {
      return <Error />
    }

    return (
      <main> 
        <h1> Mentors </h1>
        <MentorsList mentors={mentors} />
      </main>
    )
  }
}

export default Index;
