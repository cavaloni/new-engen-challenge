import React from "react";
import { IButtonProps } from "../../../types/props";
import "./button.css";

const Button: React.FC<IButtonProps> = ({ className, onClick, label }) => {
	return (
		<button onClick={onClick} className={`main-button ${className}`}>
			{label}
		</button>
	);
};

export default Button;
