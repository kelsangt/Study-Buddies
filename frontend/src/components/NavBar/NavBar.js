import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import './NavBar.css';
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
        <div className="links-nav">
          <Link to={'/events'}>All Events</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/events/new'}>Write a Event</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <h1>Study Buddies</h1>
      { getLinks() }
    </>
  );
}

export default NavBar;