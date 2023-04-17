import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-auth">
          <Link style={{ textDecoration: 'none' }} to={'/events'}>All Events</Link>
          <Link style={{ textDecoration: 'none' }} to={'/profile'}>Profile</Link>
          <Link style={{ textDecoration: 'none' }} to={'/events/new'}>Create an Event</Link>
          <div onClick={logoutUser}>Logout</div>
        </div>
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