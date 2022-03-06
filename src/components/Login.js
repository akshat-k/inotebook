
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Inside handle Submit");
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })

        });

        const json = await response.json()
        console.log(json);
        if (json.sucess) {

            //Save auth token and re direct
            localStorage.setItem('token', json.authToken);
            navigate('/')
        }
        else {
            alert("Invalid");
            navigate('/login')
        }

    }
    const onChange = (e) => {
        console.log("On change function");
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" value={credential.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" value={credential.password} onChange={onChange} id="password" name="password" placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>



        </div>
    )
}

export default Login