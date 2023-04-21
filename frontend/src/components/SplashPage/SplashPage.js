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
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    setTimeout(() => setShowModal(1), 15000);
  }, [])

  const handleClose = (next) => () => {
    let timer = 1000;
    if (next === 10) timer = 5000;
    setShowModal(null);
    setTimeout(() => setShowModal(next), timer);
  }

    return (
      <>
        <NavBar />
        {showModal === 1 && (
          <AdToolTip type="default" onClose={handleClose(2)}>
            <span className="tooltip">
              SIGN UP TODAY AND GET 20% OFF YOUR NEXT UNDER ARMOUR PURCHASE
            </span>
          </AdToolTip>
        )}

        {showModal === 2 && (
          <AdToolTip type="alt" onClose={handleClose(3)}>
            <span className="tooltip">
              INTERESTED IN SPORTS? 
              <br /> 
              CHECK OUT BENCHWARMERS
            </span>
          </AdToolTip>
        )}

        {showModal === 3 && (
          <AdToolTip type="alt-2" onClose={handleClose(4)}>
            <span className="tooltip">
              What Ai Want 
              <br />
              ANIME GIRLS
            </span>
            <span className="small-tooltip">and a job....</span>
          </AdToolTip>
        )}

        {showModal === 4 && (
          <AdToolTip type="alt-3" onClose={handleClose(5)}>
            <span className="tooltip">
              Capycita is calling YOU 
              <br /> 
              Slide into those CAPYCORD dms
            </span>
          </AdToolTip>
        )}

        {showModal === 5 && (
          <AdToolTip type="alt-4" onClose={handleClose(6)}>
            <span className="tooltip">
              Fancy some timeless, beautiful, exquisite, superb, and magnificent ARTifacts?
            </span>
          </AdToolTip>
        )}

        {showModal === 6 && (
          <AdToolTip type="alt-5" onClose={handleClose(7)}>
            <span className="tooltip">
              Uncover long lost treasures and hidden secrets
              <br />
              Magellan
            </span>
          </AdToolTip>
        )}

        {showModal === 7 && (
          <AdToolTip type="alt-6" onClose={handleClose(8)}>
            <span className="tooltip">
              CLICK HERE FOR FREE RSPECS ON YOUR NEXT ASSESSMENT!!!!!!
            </span>
          </AdToolTip>
        )}

        {showModal === 8 && (
          <AdToolTip type="alt-7" onClose={handleClose(9)}>
            <span className="tooltip">
              Planning a karaoke night with your cohort?
              <br />
              Trip Club
            </span>
          </AdToolTip>
        )}

        {showModal === 9 && (
          <AdToolTip type="alt-8" onClose={handleClose(10)}>
            <span className="tooltip">
              That project Shank35 was working on
            </span>
          </AdToolTip>
        )}

        {showModal === 10 && (
          <AdToolTip type="alt-9" onClose={handleClose(11)}>
            <span className="tooltip">
              Looking to become a software engineer?
              <br /> Or a professional hacky sack player?
              <br /> Join App Academy
              <img src="https://cdn.buttercms.com/TOVp24PyQ9m6bD8LrV3t" alt="" className="ad-pic"/>
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