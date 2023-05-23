import React, { useState } from 'react';
import { addClass } from '../features/counter/studentSlice';
import { useDispatch, useSelector } from 'react-redux';

export const ClassroomTable = () => {
  const dispatch= useDispatch()
  const classes= useSelector((state) => state.students.classroom)
  //console.log(classes)

  const [classrooms, setClassrooms] = useState([]);
  const [newClassroom, setNewClassroom] = useState('');
  const [edit, setEdit]= useState(false)
  const [latestval, setLatestval]= useState('')
  const [latestId, setLatestId]= useState('')

  const handlePost= async (data) =>{
    console.log(data)
    const response=  await fetch("https://crud-project-kven.onrender.com/api/class", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    const details= await response.json();
    //console.log(details)
    dispatch(addClass({classroom: details}))
  }

//contains logic to edit a calculation in the db
const onEdit = async (data, id) => {
  //console.log(data, id)
  const response= await fetch(`https://crud-project-kven.onrender.com/api/class/${id}`,{
      method: "PATCH",
      headers:{
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  });
  const details= await response.json();
  //console.log("edit", details)
  dispatch(addClass({classroom: details}))
}

  const handleInputChange = (e) => {
    setNewClassroom(e.target.value);
  };

  const handleAddClassroom = () => {
    setClassrooms((prevState) => [...prevState, newClassroom]);
    let class_details= {
      classroom: newClassroom
  }
    handlePost(class_details)
    setNewClassroom('');
  };

  const handleEditClassroom = (index) => {
    //console.log(classes[index]._id)
    const editedClassroom = String(classes[index].classroom)
    console.log(editedClassroom)
    setNewClassroom(editedClassroom);
    setLatestval(editedClassroom)
    setLatestId(classes[index]._id)
    setClassrooms((prevState) => prevState.filter((_, i) => i !== index));
  };

   //contains logic to delete a calculation from the db
   const onDelete = async (id) => {
    const response= await fetch(`https://crud-project-kven.onrender.com/api/class/${id}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
        },
    });
    const data= await response.json();
    dispatch(addClass({classroom: data}));
  }

  const patchClass = () =>{
    //console.log(latestval)
      let class_name= {
        classroom: newClassroom
      }
      onEdit(class_name, latestId)
    
  }

  return (
    <div>
      <h2>Classrooms</h2>
      <table>
        <thead>
          <tr>
            <th>Classroom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classroom, index) => (
            <tr key={index}>
              <td>{classroom.classroom}</td>
              <td>
                <button onClick={() => handleEditClassroom(index)}>Edit</button>
                <button onClick={() => onDelete(classroom._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <label>
          Classroom:
          <input
            type="text"
            name="classroom"
            value={newClassroom}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleAddClassroom}>
          Add Classroom
        </button>
        <button type="button" onClick={patchClass}>
          Update
        </button>
      </form>
    </div>
  );
};
