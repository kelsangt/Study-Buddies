import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import './SplashPage.css';

function SplashPage() {
    return (
      <>
        <NavBar />
        <div id='splashpage'>
            <div id='tagline'>
              TAGLINE
            </div>
            <div id='big-cover-photo'>
              <div id='info-words'>
                Struggling with school?<br/> Sign up today and meet up with other students with the same problems.
              </div>
              <Link to='/signup'>Sign Up</Link>
            </div>

            <div id='team-div'>
              <div id='meet-team'>Meet the Team:</div>

              <div className='team-holder'>
                <div className='individual-team-component'>
                    <div id='position'>Team Lead</div>
                    <div className='team-pics-holder'>
                      <img className='team-pics' src={require('./assets/default.jpeg')}/>
                    </div>
                    <div id='team-member-name'>Kelsang Tsering</div>
                </div>
              
              
                <div className='individual-team-component'>
                    <div id='position'>Frontend Lead</div>
                    <div className='team-pics-holder'>
                      <img className='team-pics' src={require('./assets/ying.jpeg')}/>
                    </div>
                    <div id='team-member-name'>Yinglin Zhou</div>
                </div>
              

              
                <div className='individual-team-component'>
                    <div id='position'>Backend Lead</div>
                    <div className='team-pics-holder'>
                      <img className='team-pics' src={require('./assets/fahim.jpeg')}/>
                    </div>
                    <div id='team-member-name'>Fahim Capybara Khan</div>
                </div>
              

              
                <div className='individual-team-component'>
                    <div id='position'>Flex Engineer</div>
                    <div className='team-pics-holder'>
                      <img className='team-pics' src={require('./assets/diner.jpeg')}/>
                    </div>
                    <div id='team-member-name'>Justin Diner</div>
                </div>
              
              </div>

            </div>

        </div>

        <footer>
          Copyright &copy; 2023 theres no copyright
        </footer>
      </>
    );
}
  
export default SplashPage;