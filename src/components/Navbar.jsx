import React, {useState} from 'react';
import Authorization from "../pages/Authorization";
import { Link } from "react-router-dom";
import {Input, InputGroup} from 'rsuite';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@rsuite/icons/Search';
import ReorderIcon from '@mui/icons-material/Reorder';
import TableChartIcon from '@mui/icons-material/TableChart';
import InputIcon from '@mui/icons-material/Input';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Logo from '../assets/img/logo.svg';
import "../styles/Navbar.css";



const Navbar = () => {
	const [openLinks, setOpenLinks] = useState(false);
	const [value, setValue] = useState('');
	const toggleNavbar = () => {setOpenLinks(!openLinks)};
	const [isModalOpen, setOpenModal] = useState(false);
	const handleModalClose = () => {setOpenModal(false);};
	const handleModalOpen = () => {setOpenModal(true)};


	const onSearch = (searchTerm) => {
		console.log('search:', searchTerm)
	};


	return (
		<div className="navbar">
			<div className="leftSide" id={openLinks ? "open" : "close"}>
				<img alt="logo" src={Logo}/>
				<h5>Premier League</h5>
				<div className="hiddenLinks">
					<Link title="Input" to="/input"><InputIcon/></Link>
					<Link title="Table" to="/table"><TableChartIcon/></Link>
					<Link title="Results" to="/results"><ScheduleIcon/></Link>
				</div>
			</div>
			<div className="rightSide">
				<Link title="Input" to="/input">Input</Link>
				<Link title="Table" to="/table">Table</Link>
				<Link title="Results" to="/results">Results</Link>
				<div className="searchGroup">
					<InputGroup style={{width: 120, height: 30}}>
						<Input type="text" placeholder="Search..." value={value} onChange={setValue}/>
						<SearchIcon style={{width: 40}} onClick={() => {onSearch(value)}}/>
					</InputGroup>
				</div>
				<button onClick={toggleNavbar}>
					<ReorderIcon/>
				</button>
			</div>
			<div className="login-btn">
				<AccountBoxIcon
					onClick={handleModalOpen}
					sx={{color: "white"}}/>
			</div>

			{isModalOpen && (
				<Authorization handleModalClose={handleModalClose} />
			)}
		</div>
	);
};

export default Navbar;