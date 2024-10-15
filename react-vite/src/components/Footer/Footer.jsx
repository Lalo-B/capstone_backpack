import './Footer.css';
import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import '/lalo.jpg';


const Footer = () => {
    return(
        <div className='footer-big-container'>
            Meet the dev: 
            <img className='personal-image' src='/lalo.jpg' />
            <a className='footer-items' target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/gerardo-bonilla-jr-47453b1bb/'><CiLinkedin /></a>
            <a className='footer-items' target='_blank' rel="noreferrer" href='https://github.com/Lalo-B'><FiGithub/></a>
            <a className='footer-items' target='_blank' rel="noreferrer" href='https://x.com/Anipok337006' ><RiTwitterXFill /></a>

        </div>
    )
}
export default Footer;
