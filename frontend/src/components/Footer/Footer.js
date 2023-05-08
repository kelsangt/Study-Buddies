import './Footer.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Footer = () => {
    return (
        <footer id="footer">
            <div>
                Study Buddies 2023 
                <a href="https://www.github.com/kelsangt/Study-Buddies" id="footerLink" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-github" id="githubLinkFooter"></i>
                </a>
            </div>
            <div className='about-page'>
                <Link style={{ textDecoration: 'none' }} to={'/about'}>
                    <h1 id="about-us-h1">About Us</h1>
                </Link>
            </div>
        </footer>
    )
    
}

export default Footer;