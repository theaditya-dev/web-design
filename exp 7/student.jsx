function Student(props) {
  return (
    <div className="student-card">

      <div className="profile">
        {props.name.charAt(0)}
      </div>

      <h2>{props.name}</h2>

      <p>
        Course: {props.course}
      </p>

      <p>
        Marks: {props.marks}
      </p>

    </div>
  );
}

export default Student;