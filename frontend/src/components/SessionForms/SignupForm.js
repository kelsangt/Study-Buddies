import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SignupForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import image1 from '../../images/image1.png';
import image2 from '../../images/image2.png';
import image3 from '../../images/image3.png';
import image4 from '../../images/image4.png';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');

  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'firstName':
        setState = setFirstName;
        break;
      case 'lastName':
        setState = setLastName;
        break;
      case 'school':
        setState = setSchool;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      firstName,
      lastName,
      school,
      password
    };

    dispatch(signup(user)); 
  }

  return (
    <div id="mainSignupDiv">
      <img src={image1} alt="image1" id="image1"/> 
      <img src={image2} alt="image2" id="image2"/> 
      <img src={image3} alt="image3" id="image3"/> 
      <img src={image4} alt="image4" id="image4"/> 
      <div id="signupFormDiv">
        <h2 id="signupH2">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="errors">{errors?.email}</div>
          <label class="signupLabel">
            <span id="emailSpan">Email</span>
            <input className="inputField" type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.username}</div>
          <label class="signupLabel">
            <span id="usernameSpan">Username</span>
            <input className="inputField" type="text"
              value={username}
              onChange={update('username')}
              placeholder="Username"
            />
          </label>

          <div className="errors">{errors?.firstName}</div>
          <label class="signupLabel">
            <span id="firstNameSpan">First Name</span>
            <input className="inputField" type="text"
              value={firstName}
              onChange={update('firstName')}
              placeholder="First Name"
            />
          </label>

          <div className="errors">{errors?.lastName}</div>
          <label class="signupLabel">
            <span id="lastNameSpan">Last Name</span>
            <input className="inputField" type="text"
              value={lastName}
              onChange={update('lastName')}
              placeholder="Last Name"
            />
          </label>


          <div className="errors">{errors?.school}</div>
          <label class="signupLabel">
            <span id="schoolSpan">School</span>
            <input className="inputField" type="text"
              value={school}
              onChange={update('school')}
              placeholder="School"
            />
          </label>

          <div className="errors">{errors?.password}</div>
          <label class="signupLabel">
            <span id="passwordSpan">Password</span>
            <input className="inputField" type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <div className="errors">
            {password !== password2 && 'Confirm Password field must match'}
          </div>
          <label class="signupLabel">
            <span id="confirmPasswordSpan">Confirm Password</span>
            <input className="inputField" type="password"
              value={password2}
              onChange={update('password2')}
              placeholder="Confirm Password"
            />
          </label>
          <label class="submitButton">
            <input className="submitInput"
              type="submit"
              value="Sign Up"
              disabled={!email || !username || !password || password !== password2}
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;