import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // Save the auth Token and redirect
      localStorage.setItem("token", json.authToken)
      props.showAlert("Logged In successfully", "success")
      navigate("/")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")    }
  }
  const OnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
    <h1 className='mt-4'>Login to continue to Cyber-Notes</h1>
    <div className='my-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={OnChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={OnChange} />
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
export default Login
