import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../Context/noteContext";

const Login = () => {

    const context = useContext(noteContext);
    const { showAlert } = context;
    
    // const host = process.env.REACT_APP_SERVER_URL; //for using locally
    const host="https://i-notebook-backend-xi.vercel.app"

    
    const [credentials, setCredentials] = useState({email:"", password:""});

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    let navigate=useNavigate();

    const handleClick = async(e) => {
    
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({ email:credentials.email, password:credentials.password }),
          });

          const json=await response.json();
          console.log(json.success);

          if(json.success)
          {
            //save token and redirect
            localStorage.setItem("token", json.authToken);
            navigate('/');
            showAlert("User Loggedin successfully", "success"); 

          }
          else
          {
            showAlert(json.error, "danger"); 
          }


    }
    return (
        <div>
            <h2>Login to Continue to iNotebook</h2>
            <form>
                <div className="mb-3 my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Login</button>
            </form> 
        </div>
    )
}

export default Login
