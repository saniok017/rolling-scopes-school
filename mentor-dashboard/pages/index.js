import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { uniqBy } from 'lodash';

class Index extends React.Component {
  static async getInitialProps() {
    let mentors;

    try {
      const response = await fetch('http://127.0.0.1:3001/data');
      const data = await response.json();
      mentors = uniqBy(data, 'mentorFullName');
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
        <section>
          {mentors.map(mentor => (
            <h2 key={mentor.mentorFullName}>{mentor.mentorFullName}</h2>
          ))}
        </section>
      </main>
    )
  }
}

export default Index;
