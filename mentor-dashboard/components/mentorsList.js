const mentorsList = ({mentors}) => (
  <React.Fragment>
    {mentors.map(mentor => (
      <section className="mentor" key={mentor.mentorFullName}>
        <h2 className="mentor-link">
          <a href={mentor.mentorGitHub}>{mentor.mentorFullName}</a>
        </h2>
      </section> 
    ))}

    <style jsx>{`
      .mentor {
        padding: 1em 0;
      }
      .mentor-link {
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
        margin-bottom: 0.5em;
      }
      .mentor-link a {
        color: #333;
        text-decoration: none;
      }
      .mentor-link a:hover {
        text-decoration: underline;
      }
    `}
    </style>
  </React.Fragment>
)

export default mentorsList
