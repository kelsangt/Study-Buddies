import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './LoginForm.css';
import image1 from '../../images/image1.png';
import image2 from '../../images/image2.png';
import image3 from '../../images/image3.png';
import image4 from '../../images/image4.png';

import { login, clearSessionErrors } from '../../store/session';
import { setModalStatus } from '../../store/ui';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    document.getElementById("submitInput2").disabled = true;
    document.getElementById("demoButton").disabled = true;
    dispatch(setModalStatus(false));

    await dispatch(login({ email: email.toLowerCase(), password }));

    setLoading(false);
    document.getElementById("submitInput2").disabled = false;
    document.getElementById("demoButton").disabled = false;
  }

  const demoLogin = async (e) => {
    e.preventDefault();

    setDemoLoading(true);
    document.getElementById("submitInput2").disabled = true;
    document.getElementById("demoButton").disabled = true;
    dispatch(setModalStatus(false));

    await dispatch(login({email: "johndoe@nyu.edu", password: "password"}));

    setDemoLoading(false);
    document.getElementById("submitInput2").disabled = false;
    document.getElementById("demoButton").disabled = false;
  }

  return (
    <div id="mainLoginDiv">
      <img src={image1} alt="image1" id="image1"/> 
      <img src={image2} alt="image2" id="image2"/> 
      <img src={image3} alt="image3" id="image3"/> 
      <img src={image4} alt="image4" id="image4"/> 
      <div id="loginFormDiv">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 id="loginH2">Log In</h2>
          <div className="errors">{errors?.email}</div>
          <label className="loginLabel">
            <span id="emailSpan">Email</span>
            <input type="email" className="inputField"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label className="loginLabel">
            <span id="passwordSpan">Password</span>
            <input type="password" className="inputField"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <label className="submitButton2">
            <button className={`submitInput2 ${loading ? 'loading' : ''}`}
              id="submitInput2"
              type="submit"
              disabled={!email || !password}
            >
              Log In
              <div className="loading-dots-container">
                <div className="loading-dot" />
                <div className="loading-dot" />
                <div className="loading-dot" />
              </div>
            </button>
          </label>
        </form>
        <label className="submitButton2">
            <button id="demoButton" className={`${demoLoading ? 'loading' : ''}`} onClick={demoLogin}>
              Demo Login
              <div className="loading-dots-container">
                <div className="loading-dot" />
                <div className="loading-dot" />
                <div className="loading-dot" />
              </div>
            </button>
        </label>
        <a id="signupAnchor" href="/signup">
            New to Study Buddies? Sign up here
        </a>
      </div>
    </div>
  );
}

export default LoginForm;