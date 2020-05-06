import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

function Search() {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);
	const { users, clearUsers, searchUsers } = githubContext;
	const { showAlert } = alertContext;
	const [text, setText] = useState("");

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === "") {
			showAlert("Please, enter something first", "light");
		} else {
			searchUsers(text);
			setText("");
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="text"
					placeholder="Search..."
					value={text}
					onChange={handleChange}
				/>
				<button className="btn btn-dark btn-block">Search</button>
				{users.length > 0 && (
					<button
						className="btn btn-light btn-block"
						onClick={clearUsers}
						style={{ marginTop: "1rem" }}>
						Clear
					</button>
				)}
			</form>
		</div>
	);
}

export default Search;
