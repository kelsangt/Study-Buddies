import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import './SplashPage.css';
import TeamList from "./TeamList";
import splashimage1 from './assets/splashimage1.png';
import splashimage3 from './assets/splashimage3.png';
import Footer from "../Footer/Footer";
import { useEffect, useState } from 'react';
import { AdToolTip } from '../../context/Modal';

function SplashPage() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowModal(true), 15000);
  }, [])

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => setShowModal2(true), 5000);
  }

    return (
      <>
        <NavBar />
        {showModal && (
          <AdToolTip type="default" onClose={handleClose}>
            <span className="tooltip">
              SIGN UP TODAY AND GET 20% OFF YOUR NEXT UNDER ARMOUR PURCHASE
            </span>
          </AdToolTip>
        )}

        {showModal2 && (
          <AdToolTip type="alt" onClose={() => setShowModal2(false)}>
            <span className="tooltip">
              INTERESTED IN SPORTS? <br /> CHECK OUT BENCHWARMERS
            </span>
          </AdToolTip>
        )}

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