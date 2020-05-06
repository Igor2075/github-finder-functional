import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	const searchUsers = async (searchString) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${searchString}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		const users = res.data.items;

		dispatch({
			type: SEARCH_USERS,
			payload: users,
		});
	};

	const getUser = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		const user = res.data;
		dispatch({
			type: GET_USER,
			payload: user,
		});
	};

	const getUserRepos = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		const repos = res.data;
		dispatch({
			type: GET_REPOS,
			payload: repos,
		});
	};

	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				getUser,
				getUserRepos,
				clearUsers,
			}}>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
