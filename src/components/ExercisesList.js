import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Exercise from './Exercise';
import AlertComp from './AlertComp';
import { Table } from 'react-bootstrap';

/*
  1. FIX header of table.
  2. Add loading screen.
  3. Add login/passs screen.
  4. Add Google Login also.
*/


function ExercisesList() {

  const [exList, setExList] = useState({
    exercises: [],
  });
  //const [showAlert, setShowAlert] = useState(false);
  const [alert_Id, setAlert_Id] = useState({
    showAlert: false,
    id: ''
  });


  useEffect(() => {
    debugger;
    axios.get('http://localhost:5000/exercises/')
      .then(res => {
        debugger;
        setExList(exer => ({
          ...exer,
          exercises: res.data,
        }))
      })
      .catch(err => console.log(err));
  }, []);


  function deleteExercise(id) {
    debugger;
    setAlert_Id(aId => ({ // to show Alert on delete
      showAlert: true,
      id: id
    }));
    // axios.delete('http://localhost:5000/exercises/'+id) // to remove the deleted item from dB
    // .then(res => console.log(res.data))
    // .catch(err => console.log(err));

    // setExList(exer =>({ // to remove the deleted item from screen
    //     ...exer,
    //     exercises :exList.exercises.filter(el => el._id !== id),         
    // }));
  }


  function loadExerciseList() {
    debugger;
    console.log(exList.exercises);
    return exList.exercises.map((currentexercise) => {
      return (
        <Exercise exercise={currentexercise} deleteExercise={deleteExercise}
          key={currentexercise._id} />
      );
    });
  }


  function toDeleteOrNot(val) {
    debugger;
    // alert(val + " ID:: "+alert_Id.id);
    setAlert_Id(aId => ({ // to show Alert on delete
      ...aId,
      showAlert: false,
    }));

    if (val) {
      alert('data Deleted');

      axios.delete('http://localhost:5000/exercises/' + alert_Id.id) // to remove the deleted item from dB
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

      setExList(exer => ({ // to remove the deleted item from screen
        ...exer,
        exercises: exList.exercises.filter(el => el._id !== alert_Id.id),
        //exercises :exList.exercises.filter(el => el._id !== id),         
      }));

    }
  }


  return (
    <>
      <h3>Logged Exercises</h3>
      {alert_Id.showAlert ? <AlertComp confirmOrNot={toDeleteOrNot} /> : ' '}
      <div style={{ "height": "75vh", "overflowY": "auto" }}>
        <Table striped bordered hover >
          <thead >
            <tr >
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadExerciseList()}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ExercisesList