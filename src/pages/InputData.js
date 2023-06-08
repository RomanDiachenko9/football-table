import '../styles/InputData.css';
import React, {useEffect, useMemo, useState} from "react";
import {Button, Input, SelectPicker, Message} from "rsuite";
import FormGroup from "rsuite/FormGroup";
import {teams} from '../helpers/teams';



const InputData = () => {

	const [matches, setMatches] = useState([]);
	const [selectedMatchDay, setSelectedMatchDay] = useState(1);
	const [saveButton, setSaveButton] = useState(false);

	const selectPickerData = teams.map(team => ({ label: team.name, value: team.id}))


	const submitResults = () => {
		const matchesData = JSON.parse(localStorage.getItem('matchDays'));
		const matchDayData = { selectedMatchDay, matches: matches };
		let dayData = [];
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
		setSaveButton(true);
	}


	useEffect(()=> {
		const daysData = JSON.parse(localStorage.getItem('tableDataTeam'));
		const matchesData = JSON.parse(localStorage.getItem('matchDays'));

		if (daysData) {
			const matchDayData = matchesData.find(day => day.selectedMatchDay === selectedMatchDay);

			if (matchDayData) {
				setSaveButton(true);
				setMatches(matchDayData.matches);
			} else {
				const newCheck = [];
				for(let i = 0; i < teams.length / 2; i++ ) {
					newCheck.push({matchId: '', homeTeamId: '', homeScore: '', awayTeamId: '', awayScore: '', games: ''})
				}
				setMatches(newCheck);
				setSaveButton(false);
			}
		} else {
			const newCheck = [];
			for(let i = 0; i < teams.length / 2; i++ ) {
				newCheck.push({matchId: '', homeTeamId: '', homeScore: '', awayTeamId: '', awayScore: '', games: ''})
			}
			const matchesId = matches.map(match => match.homeTeamId + match.awayTeamId);
			setMatches(newCheck);
			setSaveButton(false);
		}
	}, [selectedMatchDay]);




	const calculateTable = (goalsScored, goalsConceded) => {
		let points = 0;
		if (goalsScored > goalsConceded) {
			points = 3;
		}  else if (goalsScored === goalsConceded){
			points = 1;
		}
		return points;
	}


	const daysData = useMemo(() => {
		const days = [];
		for (let i = 0; i < (teams.length - 1) * 2; i++) {
			days.push({
				value: i + 1,
				label: i + 1
			});
		}
		return days;
	}, []);

	return (
		<div className="input-table">
			<div className="match-day">
				<h2>MatchDay #</h2>
				<SelectPicker
					data={daysData}
					value={selectedMatchDay}
					onChange={setSelectedMatchDay}
					cleanable={false}
					searchable={false}
					className="match-day-picker"
				/>
			</div>
			<div className="input-results">
				{
					matches.map((match, i) => (
						<div className='select'
						     key={i}>
							<SelectPicker
								className='choose-team'
								data={selectPickerData}
								value={match.homeTeamId}
								disabled={saveButton}
								searchable={false}
								onChange={value => {
									const newArray = [...matches];
									newArray[i].homeTeamId = value;
									setMatches(newArray)
								}}
							/>
							<input
								className="input-score"
								type="number"
								min="0"
								value={match.homeScore}
								disabled={saveButton}
								onChange={(e) => {
									const newArray = [...matches];
									newArray[i].homeScore = Number(e.target.value);
									setMatches(newArray)
								}}
							/>:
							<input
								className="input-score"
								type="number"
								min="0"
								value={match.awayScore}
								disabled={saveButton}
								onChange={(e) => {
									const newArray = [...matches];
									newArray[i].awayScore = Number(e.target.value);
									setMatches(newArray)
								}}
							/>
							<SelectPicker
								className='choose-team'
								data={selectPickerData}
								value={match.awayTeamId}
								disabled={saveButton}
								searchable={false}
								onChange={value => {
									const newArray = [...matches];
									newArray[i].awayTeamId = value;
									setMatches(newArray)
								}}
							/>
						</div>
					))
				}
			</div>
			<div className="outButton">
				<Button
					className="submit"
					onClick={submitResults}
					disabled={saveButton}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};


export default InputData;