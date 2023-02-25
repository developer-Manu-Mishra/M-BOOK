import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../style.css"

const Login = (props) => {
    const [cred, setCred] = useState({ email: "", password: "" })
    let navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });

        const json = await response.json();
        console.log(json)

        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate("/")
            props.showAlert("Logged In Successfully !","success")
        }
        else{
            props.showAlert("Invalid Credientials","danger")
        }

    }
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className="container my-4">
            <h4 className='text-center'>
                Log In to Use M-Book
            </h4>

        </div>
        <div className='container-form my-4 px-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' value={cred.email} onChange={onchange} className="form-control" id="email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} name='password'value={cred.password}  id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
        </>
    )
}

export default Login
