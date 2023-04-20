import { useEffect } from 'react';
import capy from './assets/powerup.wav';
import leo from './assets/keleo.mp3';
import mongo from './assets/mongoose.mp3';
import kitty from './assets/kitty4.mp3';
import kittyAlert from "./assets/kitty_red_alert.mp3";
import './TeamList.css'

const { useSelector, useDispatch } = require('react-redux')
const { getMemes, setLeo, setGiiirrrl, setCapy, setMongoose, resetMemes } = require('../../store/memes')

const TeamList = () => {
  const memeState = useSelector(getMemes);
  const dispatch = useDispatch()
  
  const capySound = new Audio(capy);
  capySound.volume = 0.6;
  const leoSound = new Audio(leo);
  const mongoSound = new Audio(mongo);
  const kittySound = new Audio(kitty);
  kittySound.volume = 0.3;
  const kittyAlertSound = new Audio(kittyAlert);
  
  useEffect(() => {
    dispatch(resetMemes());
    return () => dispatch(resetMemes());
  }, [])

  const handleMemeToggle = (selected) => async (e) => {
    switch (selected) {
      case 'keleo':
        if (!memeState.keleo) {
          leoSound.play();
          setTimeout(() => {
            leoSound.pause();
          }, 4000);

          dispatch(setLeo(true));
          e.currentTarget.src = require('./assets/keleo.png');
        }
        break;
      case 'giiirrrl':
        if (!memeState.giiirrrl) {
          kittySound.play();
          kittyAlertSound.play();
          setTimeout(() => {
            kittySound.pause();
            kittyAlertSound.pause();
          }, 4200);

          dispatch(setGiiirrrl(true));
          e.currentTarget.src = require('./assets/giiirrrl.jpg');

          const positionText = document.getElementById("frontend-lead");
          positionText.innerHTML = "Frontend Lead <br /> guuuuuuuuurl";

          const positionClass = document.querySelectorAll(".teamPosition");
          positionClass.forEach(item => {
            const newHeight = Math.max(positionText.offsetHeight, item.offsetHeight)
            item.style.minHeight = `${newHeight}px`
          });
        }
        break;
      case 'capy':
        if (!memeState.ssjCapy) {
          capySound.play();
          setTimeout(() => {
            capySound.pause();
          }, 4000);

          dispatch(setCapy(true));
          e.currentTarget.src = require('./assets/ssj_capy.png');

          const positionText = document.getElementById("meme-lead");
          positionText.innerHTML = "Backend Lead <br /> Frontend Lead <br /> Flex Lead <br /> Meme Lead <br /> Lead Lead <br /> Mongobara Lead";

          const positionClass = document.querySelectorAll(".teamPosition");
          positionClass.forEach(item => {
            const newHeight = Math.max(positionText.offsetHeight, item.offsetHeight)
            item.style.minHeight = `${newHeight}px`
          });
        }
        break;
      case 'mongoose':
        if (!memeState.mongoose) {
          mongoSound.play();
          dispatch(setMongoose(true));
          e.currentTarget.src = require('./assets/mongoose.jpg');

          const positionText = document.getElementById("flex-lead");
          positionText.innerHTML = "Flex Engineer <br /> Lv 99 Map Wizard <br /> Map Guru <br /> Map Meister <br /> Reincarnation of Gerardus Mercator <br /> Erastothenes' Descendant <br /> Lord of Gmaps <br /> Mr. Steal Yo GMap <br /> Creator of Sorcerer's Quest";

          const positionClass = document.querySelectorAll(".teamPosition");
          positionClass.forEach(item => {
            const newHeight = Math.max(positionText.offsetHeight, item.offsetHeight)
            item.style.minHeight = `${newHeight}px`
          });
        }
        break;
      default:
        return
    }
  }

  // const handleMemeToggle = () => {}

  return (
    <div id='team-div'>
      <div id='meet-team'>Meet our Team</div>

      <div className='team-holder'>
        <div className='individual-team-component'>
            <div id="team-lead" className='teamPosition'>Team Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/default.jpeg')}
                alt=''
                onClick={handleMemeToggle('keleo')}
              />
            </div>
            <div id='team-member-name'>Kelsang Tsering</div>
            <div id="kelsang-links">
              <a href="https://github.com/kelsangt/Study-Buddies">
                  <i className="fa fa-github" id="githubLink"></i>
              </a>
              <a href="https://www.linkedin.com/in/kelsang-tsering/">
                  <i className="fa fa-linkedin" id="linkedInLink"></i>
              </a>
            </div>

        </div>
      
        <div className='individual-team-component'>
            <div id="frontend-lead" className='teamPosition'>Frontend Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/ying.jpeg')}
                alt=''
                onClick={handleMemeToggle('giiirrrl')}
              />
            </div>
            <div id='team-member-name'>Yinglin Zhou</div>
            <div id="ying-links">
              <a href="https://github.com/yinglzhou">
                  <i className="fa fa-github" id="githubLink"></i>
              </a>
              <a href="https://www.linkedin.com/in/yinglzhou/">
                  <i className="fa fa-linkedin" id="linkedInLink"></i>
              </a>
            </div>

        </div>
      
        <div className='individual-team-component'>
            <div id="meme-lead" className='teamPosition'>Backend Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/fahim.jpeg')}
                alt=''
                onClick={handleMemeToggle('capy')}
              />
            </div>
            <div id='team-member-name'>Fahim Khan</div>
            <div id="fahim-links">
              <a href="https://github.com/fk652">
                  <i className="fa fa-github" id="githubLink"></i>
              </a>
              <a href="https://www.linkedin.com/in/fk652/">
                  <i className="fa fa-linkedin" id="linkedInLink"></i>
              </a>
            </div>
        </div>
      
        <div className='individual-team-component'>
            <div id="flex-lead" className='teamPosition'>Flex Engineer</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/diner.jpeg')}
                alt=''
                onClick={handleMemeToggle('mongoose')}
              />
            </div>
            <div id='team-member-name'>Justin Diner</div>
            <div id="justin-links">
              <a href="https://github.com/Justin-Diner">
                  <i className="fa fa-github" id="githubLink"></i>
              </a>
              <a href="https://www.linkedin.com/in/justin-diner/">
                  <i className="fa fa-linkedin" id="linkedInLink"></i>
              </a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TeamList;