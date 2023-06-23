import React from 'react';
import {Link} from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import "../styles/Footer.css";

const Footer = () => {
	return (
		<div className="footer">
			<div className="socialMedia">
				<Link title="Telegram"
				      target="_blank"
				      to="https://www.premierleague.com/"><LanguageIcon aria-label="Web-site"/>
				</Link>
				<Link title="Instagram"
				      target="_blank"
				      to="https://instagram.com/premierleague"><InstagramIcon aria-label="Instagram"/>
				</Link>
				<Link title="Facebook"
				      target="_blank"
				      to="https://www.facebook.com/premierleague"><FacebookIcon aria-label="Facebook"/>
				</Link>
			</div>
			<p>&copy; 2023 </p>
		</div>
	);
};

export default Footer;