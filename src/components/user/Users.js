import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

function Users({ loading, users, getUser }) {
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

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default Users;
