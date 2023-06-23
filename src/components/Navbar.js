import React, {useState} from 'react';
import Logo from '../assets/logo.svg';
import "../styles/Navbar.css";
import {Link} from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import TableChartIcon from '@mui/icons-material/TableChart';
import InputIcon from '@mui/icons-material/Input';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@rsuite/icons/Search';
import { Button, Input, InputGroup } from 'rsuite';


const Navbar = () => {
	const  [openLinks, setOpenLinks] = useState(false);
	const toggleNavbar = () => {
		setOpenLinks(!openLinks)
	}

	const [value, setValue] = useState('');
	const onChange = (event) => {
		setValue(event.target.value)
	}
	const onSearch = (searchTerm) => {
		console.log('search:', searchTerm)
	}



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
					</InputGroup>
						<SearchIcon style={{width: 40}} onClick={() => {onSearch(value)}}/>
				</div>
				<button onClick={toggleNavbar}>
					<ReorderIcon/>
				</button>
			</div>
		</div>
	);
};

export default Navbar;