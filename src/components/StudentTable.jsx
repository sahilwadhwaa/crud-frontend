import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClass, addDetails } from '../features/counter/studentSlice';

export const StudentTable = () => {
  const dispatch= useDispatch();
  const classrooms = useSelector((state) => state.students.classroom);
  //console.log(classrooms)
  const details= useSelector((state) => state.students.students);
  //console.log(details)
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    classroom: '',
    email: "default@gmail.com",
    password: "qwerty"
  });
  useEffect(() => {  
    getDetails();
    getClass();
  }, [])

//contains logic for the GET request to display the data
const getDetails= async () => {
  const response= await fetch("https://crud-project-kven.onrender.com/api/student", {
      method: "GET"
  })
  const data= await response.json();
  console.log(data)
  //setDetails(data)
  dispatch(addDetails({students: data}));
}

//contains logic for the GET request to display the data
const getClass= async () => {
  const response= await fetch("https://crud-project-kven.onrender.com/api/class", {
      method: "GET"
  })
  const data= await response.json();
  //console.log(data)
  //setDetails(data)
  dispatch(addClass({classroom: data}));
}

  //POST REQUEST HANDLER
  const handlePost= async (data) =>{
    const response=  await fetch("https://crud-project-kven.onrender.com/api/student", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    const details= await response.json();
    console.log(details)
    dispatch(addDetails({students: details}))
}

  const handleInputChange = (e) => {
    setNewStudent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddStudent = () => {
    setStudents((prevState) => [...prevState, newStudent]);
    let stud_details= {
      name: newStudent.name,
      rollno:newStudent.rollNumber ,
      classname: newStudent.classroom,
      email: newStudent.email,
      password: newStudent.password
  }
    console.log(students)
    setNewStudent({ name: '', rollNumber: '', classroom: '' });
  };

  const handleEditStudent = (index) => {
    const editedStudent = students[index];
    setNewStudent({ ...editedStudent });
    setStudents((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleDeleteStudent = (index) => {
    setStudents((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Classroom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.classroom}</td>
              <td>
                <button onClick={() => handleEditStudent(index)}>Edit</button>
                <button onClick={() => handleDeleteStudent(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={newStudent.name} onChange={handleInputChange} />
        </label>
        <label>
          Roll Number:
          <input
            type="text"
            name="rollNumber"
            value={newStudent.rollNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Classroom:
          <select name="classroom" value={newStudent.classroom} onChange={handleInputChange}>
            <option value="">Select Classroom</option>
            {classrooms.map((classroom, index) => (
              <option key={index} value={classroom.classroom}>
                {classroom.classroom}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={handleAddStudent}>
          Add Student
        </button>
      </form>
    </div>
  );
};
