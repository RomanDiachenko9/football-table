import React, {useEffect, useMemo, useState} from "react";
import { Link } from "react-router-dom";
import {teams} from '../helpers/teams';
import {Button, SelectPicker, Message, Modal, useToaster, InputNumber, DatePicker, Panel, Placeholder} from "rsuite";
import RemindIcon from '@rsuite/icons/legacy/Remind';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TableChartIcon from '@mui/icons-material/TableChart';
import '../styles/InputData.css';


const InputData = () => {

	const [matches, setMatches] = useState([]);
	const [selectedMatchDay, setSelectedMatchDay] = useState(1);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const [open, setOpen] = useState(false);
	const toaster = useToaster();
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);


	const selectPickerData = teams.map(team => ({ label: team.name, value: team.id, img: team.icon}));


	const handleOptionChange = (value) => {
		if (selectedOptions.includes(value)) {
			const newOptions = selectedOptions.filter(opt => opt !== value)
			setSelectedOptions(newOptions);
		} else {
			setSelectedOptions(prev => ([...prev, value]));
		}
	}; // Function for select unique team in select options


	const emptyFieldsValidations = () => {
		const array = [];
		matches.forEach(match => {
			for (const [value] of Object.entries(match)) {
				array.push(typeof value === "string" ? !!value : true)
			}
		})
		return array.every(e => e === true);
	}



	const submitResults = () => {
		if(emptyFieldsValidations()) {
			const matchesData = JSON.parse(localStorage.getItem('matchDays'));
			const matchDayData = { selectedMatchDay, matches: matches};
			let dayData;
			if (!matchesData) {
				dayData = [matchDayData]
				localStorage.setItem('matchDays', JSON.stringify(dayData));
			} else {
				dayData = [...matchesData, matchDayData]
				localStorage.setItem('matchDays', JSON.stringify(dayData));
			}
			let team = [...teams]
			dayData.forEach(matchDayData => {
				matchDayData.matches.forEach(match => {

					const elseTeam = team.filter(e => e.id !== match.homeTeamId && e.id !== match.awayTeamId);
					const home = team.find(e => e.id === match.homeTeamId);
					const away = team.find(e => e.id === match.awayTeamId);
					team = [
						...elseTeam,
						{
							...home,
							games: home.games ? home.games + 1  : 1,
							goalsScored: home.goalsScored ? home.goalsScored + match.homeScore : match.homeScore,
							goalsConceded: home.goalsConceded ? home.goalsConceded + match.awayScore : match.awayScore,
							goalsDifference: home.goalsDifference ? home.goalsDifference + (match.homeScore - match.awayScore) : (match.homeScore - match.awayScore),
							points: home.points ? home.points + calculateTable(match.homeScore, match.awayScore) : calculateTable(match.homeScore, match.awayScore)
						},
						{
							...away,
							games: away.games ? away.games + 1  : 1,
							goalsScored: away.goalsScored ? away.goalsScored + match.awayScore : match.awayScore,
							goalsConceded: away.goalsConceded ? away.goalsConceded + match.homeScore : match.homeScore,
							goalsDifference: away.goalsDifference ? away.goalsDifference + (match.awayScore - match.homeScore) : (match.awayScore - match.homeScore),
							points: away.points ? away.points + calculateTable(match.awayScore, match.homeScore) : calculateTable(match.awayScore, match.homeScore)
						}
					];
				})
			})
			localStorage.setItem('tableDataTeam', JSON.stringify(team));
			setIsDisabled(true);
			setSelectedOptions([]);
			nextDay();
			toaster.push(
				<Message showIcon type="success" header="Success" duration="2000">
					Results saved!
				</Message>, {placement: 'topCenter'});
		}
		else {
			toaster.push(
				<Message showIcon type="error" header="Error" duration="2000">
				Fields are empty!</Message>, {placement: 'topCenter'});
		}


	}; // Set items from input data to locale storage


	const nextDay = () => {
		setSelectedMatchDay(selectedMatchDay + 1)
	} // Function to link on next day after fill previous


	const refill = () => {
		const daysData = JSON.parse(localStorage.getItem('tableDataTeam'));
		const matchesData = JSON.parse(localStorage.getItem('matchDays'));


		if (daysData) {
			const matchDayData = matchesData.find(day => day.selectedMatchDay === selectedMatchDay);
			if (matchDayData) {
				setIsDisabled(true);
				setMatches(matchDayData.matches);
			} else {
				const newCheck = [];
				for(let i = 0; i < teams.length / 2; i++ ) {
					newCheck.push({matchId: '', homeTeamId: '', homeScore: '', awayTeamId: '', awayScore: '', games: ''})
				}
				setMatches(newCheck);
				setIsDisabled(false);
			}
		} else {
			const newCheck = [];
			for(let i = 0; i < teams.length / 2; i++ ) {
				newCheck.push({matchId: '', homeTeamId: '', homeScore: '', awayTeamId: '', awayScore: '', games: ''})
			}
			setMatches(newCheck);
			setIsDisabled(false);
		}
	} // Function to refill data


	useEffect(()=> {
		refill();
	}, [selectedMatchDay]);



	const calculateTable = (goalsScored, goalsConceded) => {
		let points = 0;
		if (goalsScored > goalsConceded) {
			points = 3;
		}  else if (goalsScored === goalsConceded){
			points = 1;
		}
		return points;
	} // Function to calculate points in table


	const daysData = useMemo(() => {
		const days = [];
		for (let i = 0; i < (teams.length - 1) * 2; i++) {
			days.push({
				value: i + 1,
				label: i + 1
			});
		}
		return days;
	}, []);  // Calculate quantity of match days depends on quantity of teams


	const deleteData = () => {
		localStorage.clear();
		refill();
		setSelectedOptions([]);
		handleClose();
		toaster.push(
			<Message showIcon type="success" header="Success" duration="2000">
				Data is deleted successfully.
			</Message>, {placement: 'topCenter'});
	} // Reset data on delete button


	const showItem = (img, team) => {
		const data = {img, team}
		const TeamImage = ({ data }) => {
			return (
				<div className="dropdown-item">
					<img src={ data.img } alt={data.name} style={{ height: 20, width: 20}}/>&nbsp;&nbsp;
					<span>{ data.team }</span>
				</div>
			)
		}
		return <TeamImage data={data}/>
	}  // Show image with item team



	return (
		<div className="input-table">
			<div className="input-results">
				<div className="match-day">
					<p className="title-matchday">Match Day </p>
					<SelectPicker
						data={daysData}
						value={selectedMatchDay}
						onChange={setSelectedMatchDay}
						searchable={true}
						className="match-day-picker"
					/>
						<p className="title-date">Date:&nbsp;</p>
						<DatePicker />
				</div>
				{
					matches.map((match, index) => (
						<div className='select'
						     key={index}>
							<SelectPicker
								className='choose-team'
								data={selectPickerData}
								value={match.homeTeamId}
								disabled={isDisabled}
								disabledItemValues={selectedOptions}
								placeholder="Select home team"
								placement={"auto"}
								searchable
								renderMenuItem={(label, item) => {return showItem(item['img'], item.label)}}
								onChange={value => {
									const newArray = [...matches];
									handleOptionChange(newArray[index].homeTeamId || value);
									newArray[index].homeTeamId = value;
									setMatches(newArray);
								}}
							/>
							<InputNumber
								className="input-score"
								defaultValue={0}
								// placeholder={0}
								min={0}
								value={match.homeScore}
								disabled={isDisabled}
								onChange={(value) => {
									const newArray = [...matches];
									newArray[index].homeScore = !isNaN(Number(value)) ? Number(value) : null;
									setMatches(newArray);
								}}/><b>:</b>
							<InputNumber
								className="input-score"
								defaultValue={0}
								// placeholder={0}
								min={0}
								value={match.awayScore}
								disabled={isDisabled}
								onChange={(value) => {
									const newArray = [...matches];
									newArray[index].awayScore = !isNaN(Number(value)) ? Number(value) : null;
									setMatches(newArray);
								}}
							/>
							<SelectPicker
								className='choose-team'
								data={selectPickerData}
								value={match.awayTeamId}
								disabled={isDisabled}
								disabledItemValues={selectedOptions}
								placeholder="Select away team"
								searchable
								placement={"auto"}
								renderMenuItem={(label, item) => {return showItem(item['img'], item.label)}}
								onChange={value => {
									const newArray = [...matches];
									handleOptionChange(newArray[index].awayTeamId || value);
									newArray[index].awayTeamId = value;
									setMatches(newArray);
								}}
							/>
						</div>
					))
				}
			</div>

			<div className="outButton">
				<Button
					className="button"
					onClick={submitResults}
					disabled={isDisabled}
					style={{backgroundColor: "green"}}
				><CheckIcon/>&nbsp;Submit
				</Button>
				<Button
					style={{backgroundColor: "red"}}
					className="button"
					onClick={handleOpen}><DeleteForeverIcon/>&nbsp;Clear
				</Button>
				<Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
					<Modal.Body>
						<RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
						&nbsp;Are you sure you want to delete the results?
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={deleteData} appearance="primary">
							Ok
						</Button>
						<Button onClick={handleClose} appearance="subtle">
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
				<Link to="/table">
					<Button style={{backgroundColor: "lightgray"}}
				            className="button"><TableChartIcon/>&nbsp;Table
					</Button>
				</Link>
			</div>
		</div>
	);
};


export default InputData;