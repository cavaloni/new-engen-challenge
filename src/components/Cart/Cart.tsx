import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { IColorData, IColorPalettes, IUserColorData } from "../../types/api";
import { ICartProps } from "../../types/props";
import ColorList from "../ColorList/ColorList";
import Button from "../shared/Button/button";
import "./cart.css";

const Cart: React.FC<ICartProps> = ({ userColors, updateUserColors }) => {
	const [paletteName, updatePaletteName] = useState<string>("");
	const [userPalettes, updateUserPalettes] = useState<string[][]>([]);

	const getPalettes = async () => {
		const res: IColorPalettes = await axios.get("user/palettes");
		const {
			data: { userPalettes: newUserPalettes }
		} = res;
		updateUserPalettes(newUserPalettes);
	};

	useEffect(() => {
		getPalettes();
	}, []);

	const deleteColor = async (color: string) => {
		const res: IUserColorData = await axios.post(`/user/current`, {
			add: false,
			color
		});
		const {
			data: { userColors: newUserColors }
		} = res;
		updateUserColors(newUserColors);
	};

	const addPalette = async () => {
		const res: IColorPalettes = await axios.post(`/user/palettes`, {
			data: { name: paletteName, palette: userColors, add: true }
		});
		const {
			data: { userPalettes: newUserPalettes }
		} = res;
		updateUserPalettes(newUserPalettes);
	};

	const deletePalette = async (pName: string) => {
		const res: IColorPalettes = await axios.post(`/user/palettes`, {
			data: { name: pName, userColors, add: false }
		});
		const {
			data: { userPalettes: newUserPalettes }
		} = res;
		updateUserPalettes(newUserPalettes);
	};

	return (
		<div className="cart-container">
			<section>
				<h2>Your current color cart palette</h2>
				<ColorList colors={userColors} deletable onDelete={deleteColor} />
				<h4>Name and save your color palette</h4>
				<div className="save-palette">
					<input
						className="palette-namer"
						value={paletteName}
						placeholder="Color palette name"
						onChange={e => updatePaletteName(e.target.value)}
					/>
					<Button onClick={() => addPalette()} label="Save Palette" />
				</div>
			</section>
			<hr />
			<section>
				<h2>Previously saved color palettes</h2>
				{userPalettes.length > 0 &&
					userPalettes.map(palette => (
						<Fragment>
							<h4>{palette[0]}</h4>
							<ColorList
								colors={palette.slice(1)}
								deleteSet={() => deletePalette(palette[0])}
							/>
						</Fragment>
					))}
			</section>
		</div>
	);
};

export default Cart;
