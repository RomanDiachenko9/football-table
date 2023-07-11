import React, {useState, useEffect, useMemo} from "react";
import TableData from "../components/TableData";
import {teams} from "../helpers/teams";
import ArrowDown from '@rsuite/icons/ArrowDown';
import ArrowUp from '@rsuite/icons/ArrowUp';
import '../styles/Table.css';


const Table = () => {

	const [sortedData, setSortedData] = useState([]);
	const [sortBy, setSortBy] = useState({
		field: 'points',
		direction: 'up'
	});


	useEffect(() => {
		let savedData = JSON.parse(localStorage.getItem('tableDataTeam'));
		setSortedData(savedData)
		if (savedData) {
			sortData('points', savedData);
			sortData('goalsDifference', savedData);
		}
	}, []);



	const sortData = (name, data) => {
		if (data) {
			const sortedArr = [...data];
			sortedArr.sort((a, b) => {
				if (sortBy.direction === 'up') {
					return a[name] > b[name] ? -1 : 1;
				} else {
					return a[name] < b[name] ? -1 : 1;
				}
			})
			setSortBy({
				field: name,
				direction: sortBy.direction === 'down' ? 'up' : 'down'
			});
			setSortedData(sortedArr);
			return sortedArr;
		}
	}; // Function to sort data in the table




	return (
			<div className="table">
				<div className="table-container">
					<div className="table-style">
						<div
							className="th place-col"
							onClick={() => sortData('place', sortedData)}>#
						</div>
						<div
							className="th place-col"
							onClick={() => sortData('label', sortedData)}>
						</div>
						<div
							className="th"
							onClick={() => sortData('name', sortedData)}>
							Team
							{sortBy.field === 'name' && sortBy.direction === 'down' ?  <ArrowUp size="sm"/> : <ArrowDown size="sm"/>}
						</div>
						<div
							className="th"
							onClick={() => sortData('games', sortedData)}>
							Games
							{sortBy.field === 'games' && sortBy.direction === 'down' ?  <ArrowUp size="sm"/> : <ArrowDown size="sm"/>}
						</div>
						<div
							className="th"
							onClick={() => sortData('goalsScored', sortedData)}>
							GS
							{sortBy.field === 'goalsScored' && sortBy.direction === 'down' ?  <ArrowUp size="sm"/> : <ArrowDown size="sm"/>}
						</div>
						<div
							className="th"
							onClick={() => sortData('goalsConceded', sortedData)}>
							GC
							{sortBy.field === 'goalsConceded' && sortBy.direction === 'down' ?  <ArrowUp size="sm"/> : <ArrowDown size="sm"/>}
						</div>
						<div
							className="th"
							onClick={() => sortData('goalsDifference', sortedData)}>
							GD
							{sortBy.field === 'goalsDifference' && sortBy.direction === 'down' ?  <ArrowUp size="sm"/> : <ArrowDown size="sm"/>}
						</div>
						<div
							className="th"
							onClick={() => sortData('points', sortedData)}>
							Points
							{sortBy.field === 'points' && sortBy.direction === 'down' ?  <ArrowUp size="sm"/> : <ArrowDown size="sm"/>}
						</div>
					</div>
					<div>
						{sortedData && sortedData.length ?
							sortedData.map((el, index) => (<TableData el={el} index={index}/>)) :
							teams.map((el, index) => (<TableData el={el} index={index}/>))
						}
					</div>
				</div>
			</div>
	)
}

export default Table;