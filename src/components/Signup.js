import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = credentials

    // Check if password matches confirm password
    if (password !== confirmpassword) {
      alert('Password and Confirm Password must match.');
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth Token and redirect
      localStorage.setItem("token", json.authToken)
      navigate("/")
      props.showAlert("Account created successfully", "success")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }
  const OnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <h1 className='mt-4'>Create an account to use Cyber-Notes</h1>
      <div className='my-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter your full name</label>
            <input type="text" className="form-control" id="name" value={credentials.name} name="name" onChange={OnChange} required minLength={3} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={OnChange} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={OnChange} required minLength={5} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmpassword" value={credentials.confirmpassword} name="confirmpassword" onChange={OnChange} required minLength={5} />
          </div>
          {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup
