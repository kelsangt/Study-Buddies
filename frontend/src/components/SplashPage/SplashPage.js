import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import './SplashPage.css';
import TeamList from "./TeamList";
import splashimage1 from './assets/splashimage1.png';
import splashmapimage from './assets/splashmapimage.png';
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
              <img src={splashmapimage} alt="splashmapimage" id="splashmapimage"/> 
              <div id="tagline2">
                <h1 id="tagline2H1">Attend study sessions in libraries across the United States</h1>
                <div id="taglineInnerDiv">
                  <h3 id="initialH3">Meet people studying topics you are interested in, grow your network, learn.</h3>
                  <h3>With easy to set up study sessions, you will always be able to contact students interested the same field of study as you.</h3>
                </div>
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