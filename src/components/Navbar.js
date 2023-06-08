import React, {useState} from 'react';
import Logo from '../assets/premier-league-1.svg';
import {Link} from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";
import TableChartIcon from '@mui/icons-material/TableChart';
import InputIcon from '@mui/icons-material/Input';
import ScheduleIcon from '@mui/icons-material/Schedule';
// import SearchIcon from '@mui/icons-material/Search';
import { Button, Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';


const Navbar = () => {

	const  [openLinks, setOpenLinks] = useState(false);
	const toggleNavbar = () => {
		setOpenLinks(!openLinks)
	}


	return (
		<div className="navbar">
			<div className="leftSide" id={openLinks ? "open" : "close"}>
				<img alt="logo" src={Logo}/>
				<div className="hiddenLinks">
					<Link title="Input" to="/input"><InputIcon/></Link>
					<Link title="Table" to="/table"><TableChartIcon/></Link>
					<Link title="Schedule" to="/schedule"><ScheduleIcon/></Link>
				</div>
			</div>
			<div className="rightSide">
				<Link title="Input" to="/input">Input</Link>
				<Link title="Table" to="/table">Table</Link>
				<Link title="Schedule" to="/schedule">Schedule</Link>
				<InputGroup style={{width: 160, height: 30}}>
					<Input type="text" placeholder="Search..." />
					<SearchIcon style={{width: 40}}/>
				</InputGroup>
				<button onClick={toggleNavbar}>
					<ReorderIcon/>
				</button>
			</div>
		</div>
	);
};

export default Navbar;