import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import './SplashPage.css';
import TeamList from "./TeamList";
import splashimage1 from './assets/splashimage1.png';
import splashimage3 from './assets/splashimage3.png';
import Footer from "../Footer/Footer";

function SplashPage() {
    return (
      <>
        <NavBar />
        <div id='splashpage'>
            <div id='big-cover-photo'>
              <div id='info-words'>
                <img src={splashimage1} alt="splashimage1" id="splashimage1"/> 
                <div id="tagline">
                  Find your perfect study group
                </div>
              </div>
            </div>
            <div>
            <div id="splashDiv2">
              <img src={splashimage3} alt="splashimage3" id="splashimage3"/> 
              <div id="tagline2">
                Attend study sessions in libraries across the United States
              </div>
              <p></p>
            </div>
            </div>
            <TeamList />
            <Footer />
        </div>

        
      </>
    );
}
  
export default SplashPage;