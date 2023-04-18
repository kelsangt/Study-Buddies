import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { useState } from 'react';
import ProfileModal from '../ProfileModal/ProfileModal';
import { setModalStatus } from '../../store/ui';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const modalState = useSelector(state => 
    (!!state.session.user && state.ui && state.ui.modalStatus) ? state.ui.modalStatus : null);

  console.log(modalState)
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }
  const handleModalToggle = () => {
    dispatch(setModalStatus(!modalState))
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <>
        <div className="links-auth">
          {/* <Link style={{ textDecoration: 'none' }} to={'/events'}>All Events</Link>
          <Link style={{ textDecoration: 'none' }} to={'/profile'}>Profile</Link>
          <Link style={{ textDecoration: 'none' }} to={'/events/new'}>Create an Event</Link>
        <div onClick={logoutUser}>Logout</div> */}
          <div id='profile-button'>
            <img src={require('./assets/cat.jpeg')} id='user-profile-img' onClick={handleModalToggle}></img>
          </div>
        </div>
        {/* {showModal && <ProfileModal/>} */}
        </>
      );
    } else {
      return (
        <div className="links-auth">

          <Link style={{ textDecoration: 'none' }} to={'/login'}>
            <div className='signup-login'>
              Login
            </div>
          </Link>

          <Link style={{ textDecoration: 'none' }} to={'/signup'}>
            <div className='signup-login'>
              Signup
            </div>
          </Link>

        </div>
      );
    }
  }
  return (
    <>
      <div className='nav-bar'>
        <div className='study-buddies'>
          <h1>Study Buddies</h1>
        </div>
        { getLinks() }
      </div>
    </>
  );
}

export default NavBar;