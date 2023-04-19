import { useEffect } from 'react';
import capy from './assets/powerup.wav';
import leo from './assets/keleo.mp3';
import mongo from './assets/mongoose.mp3';
import kitty from './assets/kitty3.mp3';

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
  kittySound.volume = 0.6;
  
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
          setTimeout(() => {
            kittySound.pause();
          }, 4000);

          dispatch(setGiiirrrl(true));
          e.currentTarget.src = require('./assets/giiirrrl.jpg');
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
          positionText.innerHTML = "Backend lead, frontend lead, flex lead, meme lead, lead lead, the whole stack lead tbh";

          const positionClass = document.querySelectorAll(".teamPosition");
          console.log(positionClass)
          positionClass.forEach(item => item.style.minHeight = `${positionText.offsetHeight}px`);
        }
        break;
      case 'mongoose':
        if (!memeState.mongoose) {
          mongoSound.play();
          dispatch(setMongoose(true));
          e.currentTarget.src = require('./assets/mongoose.jpg');
        }
        break;
      default:
        return
    }
  }

  return (
    <div id='team-div'>
      <div id='meet-team'>Meet our Team</div>

      <div className='team-holder'>
        <div className='individual-team-component'>
            <div className='teamPosition'>Team Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/default.jpeg')}
                alt=''
                onClick={handleMemeToggle('keleo')}
              />
            </div>
            <div id='team-member-name'>Kelsang Tsering</div>
        </div>
      
        <div className='individual-team-component'>
            <div className='teamPosition'>Frontend Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/ying.jpeg')}
                alt=''
                onClick={handleMemeToggle('giiirrrl')}
              />
            </div>
            <div id='team-member-name'>Yinglin Zhou</div>
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
        </div>
      
        <div className='individual-team-component'>
            <div className='teamPosition'>Flex Engineer</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/diner.jpeg')}
                alt=''
                onClick={handleMemeToggle('mongoose')}
              />
            </div>
            <div id='team-member-name'>Justin Diner</div>
        </div>
      </div>
    </div>
  )
}

export default TeamList;