import React from 'react'
import './../../../styles/Header.css';
import { BiDonateBlood, BiUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    alert('Logout successfully');
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand h1"><BiDonateBlood color='red'/> Blood Bank
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome{" "}
                {user?.name || user?.hospitalName || user?.organisationName}
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            {(location.pathname === '/' ||
              location.pathname === '/donor' ||
              location.pathname === '/hospital') ? (
              <li className="nav-item mx-3">
                <Link to='/analytics' className='nav-link'>
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            )}
            <li className="nav-item mx-3">
              <button className='btn btn-danger' onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
