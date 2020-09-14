import React, { useState } from "react";
import axios from 'axios'

function CreateUser() {
  const [user, setUser] = useState({
    username: "",
  });

  function onChangeUsername(e) {
    setUser({
      username: e.target.value,
    });
  }

  function onSubmitForm(e) {
    e.preventDefault();

    const userSnd = {
      username: user.username,
    };
    console.log(userSnd, "User");
    debugger
    axios.post('http://localhost:5000/users/add', userSnd)
        .then(res => console.log(res.data))
        .catch(err => console.log(err, "ERROR"));

    setUser({
        username: '', //to reset the field
      });
  }

  return (
    <div>
        <h3>Create New User</h3>
        <form onSubmit={onSubmitForm}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text" required className="form-control" value={user.username}
                onChange={onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
  );
}

export default CreateUser;
