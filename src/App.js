import React, {useState} from "react";
import Table from "./pages/Table"
import Input from "./pages/InputData";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";
import Footer from "../src/components/Footer";
import Login from "../src/pages/LoginPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
	return (
		<div className="App">
			<Router>
				<Navbar/>
				<Routes>
					<Route path="/" exact element={<Input/>}/>
					<Route path="/input" exact element={<Input/>} />
					<Route path="/table" exact element={<Table/>} />
					<Route path="/results" exact element={<Results/>} />
					<Route path="/login" exact element={<Login/>} />
				</Routes>
			<Footer/>
			</Router>
		</div>

	);
}

export default App;
