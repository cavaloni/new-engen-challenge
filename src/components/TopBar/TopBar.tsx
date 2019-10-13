import React from "react";
import { Link } from "react-router-dom";
import { IUserColorProps } from "../../types/props";
import "./top-bar.css";

const TopBar: React.FC<IUserColorProps> = props => {
	const { userColors } = props;

	return (
		<div className="top-bar">
			<Link className="logo" to="/"></Link>
			<Link className="cart-icon" to="/cart">
				<div className="user-colors-bubble">{userColors.length}</div>
			</Link>
		</div>
	);
};

export default TopBar;
