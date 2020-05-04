import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
	state = {
		text: "",
	};

	static propTypes = {
		searchUser: PropTypes.func.isRequired,
		setAlert: PropTypes.func.isRequired,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.text === "") {
			this.props.setAlert("Please, enter something first", "light");
		} else {
			this.props.searchUser(this.state.text);
			this.setState({ text: "" });
		}
	};
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						name="text"
						placeholder="Search..."
						value={this.state.text}
						onChange={this.handleChange}
					/>
					<button className="btn btn-dark btn-block">Search</button>
				</form>
			</div>
		);
	}
}

export default Search;
