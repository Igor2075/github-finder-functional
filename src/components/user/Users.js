import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

function Users({ getUser }) {
	const githubContext = useContext(GithubContext);
	const { loading, users } = githubContext;
	return (
		<div style={userStyle}>
			{loading ? (
				<Spinner />
			) : (
				users.map((user) => (
					<UserItem user={user} key={user.id} getUser={getUser} />
				))
			)}
		</div>
	);
}

const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridGap: "1rem",
};

export default Users;
