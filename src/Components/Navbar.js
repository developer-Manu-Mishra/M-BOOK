import React from 'react'
import { useEffect } from 'react';
import {
    Link
} from "react-router-dom";
import { useNavigate,useLocation } from 'react-router-dom';


function Navbar({showAlert}) {
    let navigate = useNavigate();

    let location = useLocation();
    useEffect(()=>{
        },[location])

    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
        showAlert("Logout Sucessfully !","success")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">M-BOOK</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('token')?<div className="d-flex justify-content-between">
                            <Link to="/login"  className="btn btn-outline-primary mx-2" type="submit">Login</Link>
                            <Link to="/signup" className="btn btn-outline-primary mx-2" type="submit">Sign Up</Link>
                        </div>:<button onClick={handleLogout} className="btn btn-outline-primary mx-2" type="submit">Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
