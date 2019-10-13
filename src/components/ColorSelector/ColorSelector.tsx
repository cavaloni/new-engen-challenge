import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { PAGE_LIMIT } from "../../constants";
import { IColorData, IUserColorData } from "../../types/api";
import { IColorSelectorProps } from "../../types/props";
import ColorList from "../ColorList/ColorList";
import Button from "../shared/Button/button";
import "./color-selector.css";

const ColorSelector: React.FC<IColorSelectorProps> = props => {
	const { updateUserColors, userColors } = props;

	const [colors, updateColors] = useState<string[]>([]);
	const [page, updatePage] = useState(1);

	useEffect(() => {
		const getColors = async () => {
			const query = `?page=${page}&&limit=${PAGE_LIMIT}`;
			const res: IColorData = await axios.get(`/colors${query}`);
			const {
				data: { colors: newColors }
			} = res;
			const updatedColors = colors.concat(newColors);
			updateColors(updatedColors);
		};
		getColors();
	}, [page]);

	const loadMoreClick = () => {
		const newPage = page + 1;
		updatePage(newPage);
	};

	const addColor = async (color: string) => {
		const res: IUserColorData = await axios.post(`/user/current`, {
			add: true,
			color
		});
		const {
			data: { userColors: newUserColors }
		} = res;
		updateUserColors(newUserColors);
	};

	return (
		<div className="color-selector">
			<ColorList colors={colors} addColor={addColor} />
			<Button onClick={loadMoreClick} label="Load More" />
		</div>
	);
};

export default ColorSelector;
