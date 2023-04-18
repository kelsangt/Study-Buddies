import { useEffect } from 'react';

const { useSelector, useDispatch } = require('react-redux')
const { getMemes, setLeo, setGiiirrrl, setCapy, setMongoose, resetMemes } = require('../../store/memes')

const TeamList = () => {
  const memeState = useSelector(getMemes);
  const dispatch = useDispatch()

  const capySound = document.createElement("audio");
  capySound.src = require('./assets/powerup.wav');
  capySound.preload = true;
  
  useEffect(() => {
    dispatch(resetMemes());
    return () => dispatch(resetMemes());
  }, [])

  const handleMemeToggle = (selected) => async (e) => {
    switch (selected) {
      case 'keleo':
        if (!memeState.keleo) {
          dispatch(setLeo(true));
          e.currentTarget.src = require('./assets/keleo.png');
        }
        break;
      case 'giiirrrl':
        if (!memeState.giiirrrl) {
          dispatch(setGiiirrrl(true));
          e.currentTarget.src = require('./assets/giiirrrl.jpg');
        }
        break;
      case 'capy':
        if (!memeState.capy) {
          capySound.play();
          dispatch(setCapy(true));
          e.currentTarget.src = require('./assets/ssj_capy.png');
        }
        break;
      case 'mongoose':
        if (!memeState.mongoose) {
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
                // onClick={handleMemeToggle('keleo')}
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
            <div className='teamPosition'>Backend Lead</div>
            <div className='team-pics-holder'>
              <img 
                className='team-pics' 
                src={require('./assets/fahim.jpeg')}
                alt=''
                onClick={handleMemeToggle('capy')}
              />
            </div>
            <div id='team-member-name'>Fahim Capybara Khan</div>
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