import './app.css';
import React, {useState} from "react";
import Table from "../table/table"
import InputData from "../input-data/input-data";
import Schedule from "../schedule/schedule";

import { NavigationLayout, Tab } from '../navigation-layout/navigation-layout';


function App() {


	const [tab, setTab] = useState(Tab.TABLE);
	return (
		<div className="App">
			<NavigationLayout changePage={setTab} currentPage={tab}>
				{
					tab === Tab.TABLE
						? <Table/>
						: <InputData/>
				}
			</NavigationLayout>
		</div>

	);
}

export default App;
