import Student from "./Student";

function App() {
  return (
    <div>
      <h1 className="heading">
        Student Information
      </h1>

      <Student
        name="Rahul Sharma"
        course="Computer Science"
        marks="85"
      />

      <Student
        name="Anita Verma"
        course="Information Technology"
        marks="92"
      />

      <Student
        name="Rohan Gupta"
        course="Electronics"
        marks="78"
      />
    </div>
  );
}

export default App;