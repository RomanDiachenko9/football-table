import React from 'react';

const TableData = ({el, index}) => {

	return (
				<div
					key={index}
					className="table-style">
					<div className="table-column place-col">{index + 1}</div>
					<div className="table-column place-col">
						<img alt={el.name} title={el.name} style={{width: 20, height: 20}} src={el.icon}/>
					</div>
					<div className="table-column name">{el.name}</div>
					<div className="table-column">{el.games ?? 0}</div>
					<div className="table-column">{el.goalsScored ?? 0}</div>
					<div className="table-column">{el.goalsConceded ?? 0}</div>
					<div className="table-column">{el.goalsDifference ?? 0}</div>
					<div className="table-column">{el.points ?? 0}</div>
				</div>
	);
};

export default TableData;