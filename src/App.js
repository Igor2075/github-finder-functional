import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/layout/Alert";
import Users from "./components/user/Users";
import User from "./components/user/User";
import Search from "./components/user/Search";
import axios from "axios";
import "./App.css";

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	};

	searchUser = async (searchString) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${searchString}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		const users = res.data.items;
		this.setState({ users, loading: false });
	};

	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		const user = res.data;
		this.setState({ user, loading: false });
	};

	getUserRepos = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		const repos = res.data;
		this.setState({ repos, loading: false });
	};

	clearUsers = () => {
		this.setState({ users: [] });
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });
		setTimeout(() => {
			this.setState({ alert: null });
		}, 2500);
	};

	render() {
		const { loading, users, user, repos } = this.state;
		return (
			<Router>
				<div className="App">
					<Navbar title="Github Finder" />
					<div className="container">
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<Fragment>
										<Search
											searchUser={this.searchUser}
											setAlert={this.setAlert}
										/>
										{users.length > 0 && (
											<button
												className="btn btn-light btn-block"
												onClick={this.clearUsers}
												style={{ marginTop: "1rem" }}>
												Clear
											</button>
										)}

										<Users
											users={users}
											loading={loading}
											getUser={this.getUser}
										/>
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							<Route
								exact
								path="/user/:login"
								render={(props) => (
									<User
										{...props}
										user={user}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										loading={loading}
										repos={repos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
