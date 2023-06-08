import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import "../styles/Footer.css";
import {Link} from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer">
			<div className="socialMedia">
				<Link title="Telegram"
				      target="_blank"
				      to="https://t.me/romka_diachenko"><TelegramIcon aria-label="Telegram"/>
				</Link>
				<Link title="Instagram"
				      target="_blank"
				      to="https://instagram.com/romka_diachenko/"><InstagramIcon aria-label="Instagram"/>
				</Link>
				<Link title="Facebook"
				      target="_blank"
				      to="https://www.facebook.com/vasya.kup"><FacebookIcon aria-label="Facebook"/>
				</Link>
			</div>
			<p>&copy; 2023 </p>
		</div>
	);
};

export default Footer;