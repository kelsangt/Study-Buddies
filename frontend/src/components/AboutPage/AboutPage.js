import NavBar from "../NavBar/NavBar";
import './AboutPage.css';
import TeamList from "../SplashPage/TeamList";
import Footer from "../Footer/Footer";
import aboutImage from "../../images/overview.png";
import aboutImage2 from "../../images/overview4.png";

const AboutPage = () => {
    return (
        <>
        <NavBar/>
        <div id="about-page-container">
            <TeamList/>
        </div>
        <div id="about-info">
            <img id="about-image" alt="aboutImage"src={aboutImage}/>
            <p id="about-description">Study Buddies is an application that allows students to be able to create and attend study sessions. 
            These study sessions can be held in libraries across America and can be easily organized by the 
            study session's creator.</p>
        </div>
        <div id="about-info-2">
            <img id="about-image-2" alt="aboutImage"src={aboutImage2}/>
            <p id="about-description-2">Utilizing the Google Maps API, students are be able to browse available 
            study sessions in their area, create study sessions, and request to join existing study sessions. 
            Study Buddies fosters learning by allowing students to build their network and find peers to study with.</p>
        </div>
        <Footer/>
        </>


    )
}

export default AboutPage;