import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './../../../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  return (
    <div className='sidebar'>
      <div className="menu">
        {user?.role === 'organisation' && (
          <>
            <div className={`menu-item ${location.pathname === '/' && 'active'}`}>
              <i className='fa-solid fa-warehouse'></i>
              <Link to='/'>Inventory</Link>
            </div>
            <div className={`menu-item ${location.pathname === '/donor' && 'active'}`}>
              <i className='fa-solid fa-hand-holding-medical'></i>
              <Link to='/donor'>Donor</Link>
            </div>
            <div className={`menu-item ${location.pathname === '/hospital' && 'active'}`}>
              <i className='fa-solid fa-hospital'></i>
              <Link to='/hospital'>Hospital</Link>
            </div>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <div className={`menu-item ${location.pathname === '/donor-list' && 'active'}`}>
              <i className='fa-solid fa-warehouse'></i>
              <Link to='/donor-list'>Donor list</Link>
            </div>
            <div className={`menu-item ${location.pathname === '/hospital-list' && 'active'}`}>
              <i className='fa-solid fa-hand-holding-medical'></i>
              <Link to='/hospital-list'>Hospital list</Link>
            </div>
            <div className={`menu-item ${location.pathname === '/organisation-list' && 'active'}`}>
              <i className='fa-solid fa-hospital'></i>
              <Link to='/organisation-list'>Organisation list</Link>
            </div>
          </>
        )}
        {(user?.role === 'donor' || user?.role === 'hospital') && (
          <>
            <div className={`menu-item ${location.pathname === '/organisation' && 'active'}`}>
              <i className='fa-sharp fa-solid fa-building-ngo'></i>
              <Link to='/organisation'>Organisation</Link>
            </div>
          </>
        )}
        {(user?.role === 'hospital') && (
          <>
            <div className={`menu-item ${location.pathname === '/consumer' && 'active'}`}>
              <i className='fa-sharp fa-solid fa-building-ngo'></i>
              <Link to='/consumer'>Organisation</Link>
            </div>
          </>
        )}
        {(user?.role === 'donor') && (
          <>
            <div className={`menu-item ${location.pathname === '/consumer' && 'active'}`}>
              <i className='fa-sharp fa-solid fa-building-ngo'></i>
              <Link to='/donation'>Donation</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Sidebar
