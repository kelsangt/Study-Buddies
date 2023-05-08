import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { useEffect, useState } from 'react';
import ProfileModal from '../ProfileModal/ProfileModal';
import { setModalStatus } from '../../store/ui';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const modalState = useSelector(state => state.ui.modalStatus);
  
  useEffect(() => {
    if (location.pathname === '/settings' || (loggedIn && location.pathname === '/about')) {
      
      let button = document.getElementsByClassName('profile-button')[0];
      
      button.setAttribute('id', 'profile-button')
      
    }
  }, [])
  const handleModalToggle = () => {
    if (location.pathname === '/home') {
      if (modalState) {
        const modal = document.getElementById('profile-modal-container')
        modal.classList.add('slideout')
        setTimeout(()=>{
          dispatch(setModalStatus(!modalState))
        }, 500)
      } else {
        dispatch(setModalStatus(!modalState))
      }
    }
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

          <div className='profile-button'>
            <img src={require('./assets/defaultprofile.png')} id='user-profile-img' onClick={handleModalToggle}></img>
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
          <Link style={{ textDecoration: 'none' }} to={'/home'}>
            <h1>Study Buddies</h1>
          </Link>
        </div>
        { getLinks() }
      </div>
    </>
  );
}

export default NavBar;