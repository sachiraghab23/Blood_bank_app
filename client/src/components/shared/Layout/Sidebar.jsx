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
            <div className={`menu-item ${location.pathname = '/' && 'active'}`} key={menu.name}>
              <i className='fa-solid fa-warehouse'></i>
              <Link to='/'>Inventory</Link>
            </div>
            <div className={`menu-item ${location.pathname = '/donor' && 'active'}`} key={menu.name}>
              <i className='fa-solid fa-hand-holding-medical'></i>
              <Link to='/donor'>Donor</Link>
            </div>
            <div className={`menu-item ${location.pathname = '/hospital' && 'active'}`} key={menu.name}>
              <i className='fa-solid fa-hospital'></i>
              <Link to='/hospital'>Hospital</Link>
            </div>
          </>
        )}
        {(user?.role === 'donor' || user?.role === 'hospital') && (
          <>
            <div className={`menu-item ${location.pathname = '/organisation' && 'active'}`} key={menu.name}>
              <i className='fa-sharp fa-solid fa-building-ngo'></i>
              <Link to='/organisation'>Organisation</Link>
            </div>
          </>
        )}
        {(user?.role === 'hospital') && (
          <>
            <div className={`menu-item ${location.pathname = '/consumer' && 'active'}`} key={menu.name}>
              <i className='fa-sharp fa-solid fa-building-ngo'></i>
              <Link to='/consumer'>Organisation</Link>
            </div>
          </>
        )}
        {(user?.role === 'donor') && (
          <>
            <div className={`menu-item ${location.pathname = '/consumer' && 'active'}`} key={menu.name}>
              <i className='fa-sharp fa-solid fa-building-ngo'></i>
              <Link to='/donation'>Donation</Link>
            </div>
          </>
        )}

        {/* {userMenu.map((menu) => {
          return (
            <div className={`menu-item ${isActive && 'active'}`} key={menu.name}>
              <i className={menu.icon}></i>
              <Link to={menu.path}>{menu.name}</Link>
            </div>
          )
        })} */}
      </div>
    </div>
  )
}

export default Sidebar
