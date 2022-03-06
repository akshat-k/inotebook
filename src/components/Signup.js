
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import { useAlert } from 'react-alert'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'


const Signup = () => {
  /* const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  } */


  const [credential, setCredential] = useState({ name: "", email: "", password: "" })
  let navigate = useNavigate();
  //const alert = useAlert()
  const { name, email, password } = credential;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inside handle Submit");
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })

    });

    const json = await response.json()
    console.log(json);
    if (json.sucess) {

      //Save auth token and re direct
      localStorage.setItem('token', json.authToken);
      alert("User created successfully")
      navigate('/mainhome')
      
    }
    else {
      // alert.show('Invalid','success')
      alert(json.error);
    }

  }

  const onChange = (e) => {
    console.log("On change function");
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Conform Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>


    </div>
  )
}

export default Signup