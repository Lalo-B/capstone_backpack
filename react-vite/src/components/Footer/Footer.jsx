import './Footer.css';
import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";


const Footer = () => {
    return(
        <div className='footer-big-container'>
            <div></div>
            <a className='footer-items' target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/gerardo-bonilla-jr-47453b1bb/'><CiLinkedin /></a>
            <a className='footer-items' target='_blank' rel="noreferrer" href='https://github.com/Lalo-B'><FiGithub/></a>

        </div>
    )
}
export default Footer;
