import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
       // console.log(location); // location is an object which contains hash,key,pathname,search,state
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/mainhome');
    }

    return <div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/mainhome">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">

                        <Link className="btn btn-primary mx-2 bg-dark" to="/login">Login</Link>
                        <Link className="btn btn-primary mx-2 bg-dark" to="/signup">Sign Up</Link>
                    </form> : <button className="btn btn-primary mx-2 bg-dark" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>

    </div>;
};

export default Navbar;
