import '../styles/Table.css'
import React, {useState, useEffect, useMemo} from "react";
import ArrowDown from '@rsuite/icons/ArrowDown';
import ArrowUp from '@rsuite/icons/ArrowUp';


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
			sortData('points', savedData)
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
	}


	return (
		<div>
			<div className="table">
				<div className="table-container">
					<div className="table-style">
						<div
							className="th place-col"
							onClick={() => sortData('label', sortedData)}>

						</div>
						<div
							className="th"
							onClick={() => sortData('name', sortedData)}>
							Team
							{sortBy.field === 'name' && (sortBy.direction === 'down' ? <ArrowDown size="sm"/> :
								<ArrowUp size="sm"/>)}
						</div>
						<div
							className="th"
							onClick={() => sortData('games', sortedData)}>
							Games
							{/*{sortBy.field === 'games' && (sortBy.direction === 'down' ? <ArrowDown size="sm"/> :*/}
							{/*	<ArrowUp size="sm"/>)}*/}
						</div>
						<div
							className="th"
							onClick={() => sortData('goalsScored', sortedData)}>
							GA
							{sortBy.field === 'goalsScored' && (sortBy.direction === 'down' ? <ArrowDown size="sm"/> :
								<ArrowUp size="sm"/>)}
						</div>
						<div
							className="th"
							onClick={() => sortData('goalsConceded', sortedData)}>
							GF
							{sortBy.field === 'goalsConceded' && (sortBy.direction === 'down' ? <ArrowDown size="sm"/> :
								<ArrowUp size="sm"/>)}
						</div>
						<div
							className="th"
							onClick={() => sortData('goalsDifference', sortedData)}>
							GD
							{sortBy.field === 'goalsConceded' && (sortBy.direction === 'down' ? <ArrowDown size="sm"/> :
								<ArrowUp size="sm"/>)}
						</div>
						<div
							className="th"
							onClick={() => sortData('points', sortedData)}>
							Points
							{sortBy.field === 'points' && (sortBy.direction === 'down' ? <ArrowDown size="sm"/> :
								<ArrowUp size="sm"/>)}
						</div>
					</div>
					<div>
						{sortedData && sortedData.length &&
						sortedData.map((el, index) => (
								<div
									key={index}
									className="table-style">
									<div className="table-column place-col"><img style={{width: 20, height: 20}} src={el.icon}/></div>
									<div className="table-column">{el.name}</div>
									<div className="table-column">{el.games ?? 0}</div>
									<div className="table-column">{el.goalsScored ?? 0}</div>
									<div className="table-column">{el.goalsConceded ?? 0}</div>
									<div className="table-column">{el.goalsDifference ?? 0}</div>
									<div className="table-column">{el.points ?? 0}</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Table;