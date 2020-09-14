import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

function EditExercise(props) {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  function onChangeUsername(e) {
    setExercise(exer=>({
      ...exer,
      username: e.target.value,
      }));  
  }

  function onChangeDescription(e) {
    setExercise(exer=>({
      ...exer,
      description: e.target.value,
    }));
  }

  function onChangeDuration(e) {
    setExercise(exer=>({
      ...exer,
      duration: e.target.value,
    }));
  }

  function onChangeDate(passDate) {
    setExercise(exer=>({
      ...exer,
      date: passDate,
    }));
  }

  function onSubmitForm(e) {
    e.preventDefault();
    
    const exer = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };
    console.log(exer, "Exercise");
    debugger
    axios.post('http://localhost:5000/exercises/update/'+props.match.params.id, exer)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    window.location = "/"; //take back to home page
  }


  useEffect(() => {
    debugger
    axios.get('http://localhost:5000/exercises/'+props.match.params.id)
      .then(res => {
        if(res.data){
          setExercise(exer=>({
            ...exer,
            username: res.data.username,
            description: res.data.description,
            duration: res.data.duration,
            date: new Date(res.data.date),
          }));
        }
      })
      .catch(err => console.log(err))


    axios.get('http://localhost:5000/users')
      .then(res => {
        if(res.data.length>0){
          setExercise(ex => ({
            ...ex,
            users: res.data.map(user => user.username),
          }));
        }
      })
      .catch(err => console.log(err))

    
  }, []); //passing Empty array so that useEffect() is called on Mount of the component not everytime

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <label>Username: </label>
          <select  className="form-control" value={exercise.username} required
            onChange={onChangeUsername}>
            {exercise.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>

        <div  className="form-group">
          <label>Description: </label>
          <input type="text" required className="form-control" value={exercise.description} 
            onChange={onChangeDescription} />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="number" className="form-control" value={exercise.duration}
              onChange={onChangeDuration} />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={onChangeDate}/>
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise" className="btn btn-primary" />
        </div>

      </form>
    </div>
  );
}

export default EditExercise;
