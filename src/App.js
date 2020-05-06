import React from "react";
import GithubState from "./context/github/GithubState";
import AlerState from "./context/alert/AlertState";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import User from "./components/user/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/layout/Alert";

import "./App.css";

function App() {
	return (
		<GithubState>
			<AlerState>
				<Router>
					<div className="App">
						<Navbar title="Github Finder" />
						<div className="container">
							<Alert />
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/about" component={About} />
								<Route exact path="/user/:login" component={User} />
								<Route component={NotFound} />
								/>
							</Switch>
						</div>
					</div>
				</Router>
			</AlerState>
		</GithubState>
	);
}

export default App;
