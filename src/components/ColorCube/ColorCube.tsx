import React from "react";
import { IColorCubeProps } from "../../types/props";
import "../shared/css/index.css";
import "./color-cube.css";

const ColorCube: React.FC<IColorCubeProps> = ({
	addColor,
	color,
	deletable,
	onDelete,
	deleteSet
}) => {
	const trashClassname = `trash-icon ${deleteSet ? "large" : "small"} ${
		deleteSet ? "center" : "top-right"
	}`;

	const newOnDelete = () => onDelete(color);
	const defaultFunc = () => undefined;

	const defaultDeleteSet = deleteSet || defaultFunc;
	const deleteFunc = deleteSet ? defaultDeleteSet : newOnDelete;

	return (
		<div
			className={`color-cube ${!deletable && "clickable"}`}
			style={{ backgroundColor: color }}
			onClick={() => addColor(color)}
		>
			{deletable && <div className={trashClassname} onClick={deleteFunc} />}
			{color !== "#f3f3f3" && color}
		</div>
	);
};

export default ColorCube;
