import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function UserItem(props) {
	const { avatar_url, login, id } = props.user;
	return (
		<div className="card text-center" key={id}>
			<img
				src={avatar_url}
				className="round-img"
				style={{ width: "60px" }}
				alt="avatar"
			/>
			<h3>{login}</h3>
			<div>
				<Link to={`/user/${login}`} className="btn btn-dark bt-sm my-1">
					More
				</Link>
			</div>
		</div>
	);
}

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
};

export default UserItem;
