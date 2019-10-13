import React from "react";

import { IColorListProps } from "../../types/props";
import ColorCube from "../ColorCube/ColorCube";
import "./color-list.css";

const ColorList: React.FC<IColorListProps> = ({
	addColor,
	colors,
	deletable,
	onDelete,
	deleteSet
}) => {
	// Hacky work around for default props..
	const defaultAddColor = addColor ? addColor : () => undefined;
	const defaultDeleteColor = onDelete ? onDelete : () => undefined;
 
	return (
		<div className="color-list">
			{colors.map(color => (
				<ColorCube
					addColor={defaultAddColor}
					color={color}
					onDelete={defaultDeleteColor}
					deletable={deletable}
				/>
			))}
			{deleteSet && (
				<ColorCube
					addColor={defaultAddColor}
					color="#f3f3f3"
					onDelete={defaultDeleteColor}
					deleteSet={deleteSet}
					deletable
				/>
			)}
		</div>
	);
};

export default ColorList;
