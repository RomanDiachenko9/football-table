import React, {useEffect, useState} from 'react';
import {teams} from "../helpers/Teams";
import '../styles/Schedule.css'


const Schedule = () => {

	const [scheduleData, setScheduleData] = useState(new Map());

	useEffect(() => {
		const storageData = localStorage.getItem('matchDays');

		if (storageData) {
			try {
				const parsedData = JSON.parse(storageData);
				const preparedData = new Map(
					parsedData.flatMap(day => day.matches.map(match => ([`${match.homeTeamId}-${match.awayTeamId}`, match])))
				);
				// console.log(preparedData)
				setScheduleData(preparedData);
			} catch (e) {
				console.log('parse error', e);
			}

		}

	}, []);

	const getCellColor = (match) => {
		const cellClass = 'team-item';
		if (match) {
			const { homeScore, awayScore } = match;
			if (homeScore > awayScore) {
				return `${cellClass} team-win`;
			} else if (homeScore < awayScore) {
				return `${cellClass} team-lose`;
			} else {
				return `${cellClass} team-draw`;
			}
		}

		return cellClass;
	}


	return (
		<div className="container-schedule">
			<div className="home-team-title">
				<table>
					<tr className="away-team-column">
						<td></td>
						{
							teams.map((val, key) => (
								<td>
									<div className="away-title-team">
										<img title={val.name} style={{width: 25, height: 25}} src={val.icon}/>
									</div>
								</td>
							))
						}
					</tr>
					{
						teams.map((home, key) => {
							return (
								<tr className="away-team-column" key={home.id}>
									<td>
										<div className="away-title-team">
											<img title={home.name} style={{width: 25, height: 25}} src={home.icon}/>
										</div>
									</td>
									{
										teams.map((away, key) => {
											const match = scheduleData.get(`${home.id}-${away.id}`);
											const score = match ? `${match.homeScore}-${match.awayScore}` : '-';
											return home.id !== away.id
												? (
													<td key={away.id} className={getCellColor(match)}>
														<h7>{score}</h7>
													</td>
												)
												: (
													<td key={away.id} className="team-item team-item-not-exist">
														<div />
													</td>
												)
										})
									}
								</tr>
							)
						})
					}
				</table>
				<div className="schedule-description">
					<div className="description"><div className="team-item team-win"> </div><h6>Home win</h6></div>
					<div className="description"><div className="team-item team-lose"> </div><h6>Home defeat</h6></div>
					<div className="description"><div className="team-item team-draw"> </div><h6>Draw</h6></div>
				</div>
			</div>

		</div>
	);
};

export default Schedule;