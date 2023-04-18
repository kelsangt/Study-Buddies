import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import './SplashPage.css';
import TeamList from "./TeamList";

function SplashPage() {
    return (
      <>
        <NavBar />
        <div id='splashpage'>
            {/* <div id='tagline'>
              TAGLINE
            </div> */}
            <div id='big-cover-photo'>
              <div id='info-words'>
                {/* Struggling with school?<br/> Sign up today and meet up with other students with the same problems. */}
              </div>
              {/* <Link to='/signup'>Sign Up</Link> */}
            </div>

            <TeamList />
        </div>

        <footer id="footer">
          Copyright &copy; 2023 theres no copyright
        </footer>
      </>
    );
}
  
export default SplashPage;