import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navbar({ icon, title }) {
	return (
		<nav className="navbar bg-primary">
			<i className={icon} />
			{title}
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
		</nav>
	);
}

Navbar.defaultProps = {
	title: "Github Finder",
	icon: "fab fa-github",
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default Navbar;
