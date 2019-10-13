import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IUserColorData } from "../../types/api";
import Cart from "../Cart/Cart";
import ColorSelector from "../ColorSelector/ColorSelector";
import TopBar from "../TopBar/TopBar";
import "./assets/App.css";

const App: React.FC = () => {
	const [userColors, updateUserColors] = useState<string[]>([]);

	useEffect(() => {
		const getUserColors = async () => {
			const res: IUserColorData = await axios.get("user/current");
			const {
				data: { userColors: newUserColors }
			} = res;
			updateUserColors(newUserColors);
		};
		getUserColors();
	}, []);

	return (
		<div className="App">
			<Router>
				<TopBar userColors={userColors} />
				<Switch>
					<Route path="/cart">
						<Cart updateUserColors={updateUserColors} userColors={userColors} />
						ors
					</Route>
					<Route path="/">
						<ColorSelector
							updateUserColors={updateUserColors}
							userColors={userColors}
						/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
