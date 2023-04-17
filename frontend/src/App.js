import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import GMap from './components/GMap/GMap';
import {Wrapper} from "@googlemaps/react-wrapper"

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';
import MainContent from './components/MainContent/MainContent';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
<<<<<<< HEAD
      <NavBar />
			<Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
				<GMap />
			</Wrapper>
=======
>>>>>>> dfa3955364ad7142623ff159c6259dec1520c2a4
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path='/events' component={MainContent}/>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
      </Switch>
    </>
  );
}
export default App;