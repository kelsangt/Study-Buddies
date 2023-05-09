import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import GMap from './components/GMap/GMap';
import {Wrapper} from "@googlemaps/react-wrapper"

import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';
import MainContent from './components/MainContent/MainContent';
import EventCreateForm from './components/EventCreateForm/EventCreateForm';
import UserSettings from './components/UserSettings/UserSettings';
import AboutPage from './components/AboutPage/AboutPage';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <Switch>
        
        <AuthRoute exact path="/" component={SplashPage} />
        <ProtectedRoute exact path='/home' component={MainContent}/>
        <ProtectedRoute exact path='/settings' component={UserSettings}/>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <Route exact path="/about" component={AboutPage} />
        <Route path=""><Redirect to="/" /></Route>
      </Switch>
    </>
  );
}
export default App;