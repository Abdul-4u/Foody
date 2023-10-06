import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function Llogin() {
  const [credentials, setcredentials] = useState({  email: "", passward: "" })

let navigate=useNavigate(); 
    const handleSubmit = async (e) => {

        //synthetic event(e.preventDefault)
        e.preventDefault();
        console.log(JSON.stringify({ email: credentials.email, passward: credentials.passward,})
        );
        const response = await fetch('http://localhost:5000/api/loginuser', {
            method: 'POST',
           headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, passward: credentials.passward })
        });
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            //save the auth token and redirect

            alert('invalid details');
        }

        if (json.success) {
          //save the auth token and redirect

         navigate('/');
      }

    }

    const onChange = (event) => {

        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
  return (
    <>
    <div className="container">

        <form onSubmit={handleSubmit}>
           

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>


            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='passward' value={credentials.passward} onChange={onChange} />
            </div>
            
            <button type="submit" className="btn btn-success">Submit</button>
            <Link to="/signup" className='m-3 btn btn-danger'>iam  a new user)</Link>

        </form>
    </div>
</>
  )
}
