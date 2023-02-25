import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [cred, setCred] = useState({name:"", email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({name:cred.name, email: cred.email, password: cred.password })
        });
        const json = await response.json();
        console.log(json)

        if(!json.success){
            navigate("/login");
            props.showAlert("User Already Registered","warning")
        }
        else{

            alert("Successfully Signed In")
            navigate("/");
            props.showAlert("User has been Registered","success")
        }

    }
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className="container my-4">
            <h4 className='text-center'>
                Sign Up to Use M-Book
            </h4>

        </div>
        <div className='container-form my-4 px-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                    <input type="text" name='name' value={cred.name} onChange={onchange} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' value={cred.email} onChange={onchange} className="form-control" id="email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} name='password' value={cred.password} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
        </>
    )
}

export default Signup
