import './App.css';
import React, {useState} from "react";
import Table from "./pages/Table"
import InputData from "./pages/InputData";
import Results from "./pages/Results";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
	return (
		<div className="App">
			<Router>
				<Navbar/>
				<Routes>
					<Route path="/" exact element={<InputData/>}/>
					<Route path="/input" exact element={<InputData/>} />
					<Route path="/table" exact element={<Table/>} />
					<Route path="/results" exact element={<Results/>} />
				</Routes>
			<Footer/>
			</Router>
		</div>

	);
}

export default App;
