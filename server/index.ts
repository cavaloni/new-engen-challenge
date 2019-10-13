import bodyParser from "body-parser";
import express from "express";
import path from "path";
import colors from "./assets/colors";

const app = express();
app.use(bodyParser());

// In the interest of time, its a mock DB
const mockDb: { userColors: string[]; savedPalettes: string[][] } = {
	savedPalettes: [],
	userColors: []
};

app.get("/api/colors", (req: any, res) => {
	const { page, limit } = req.query;

	const begCount = Number(page) * Number(limit) - Number(limit);
	const endCount = Number(page) * Number(limit);

	const colorsToSend = colors.slice(begCount, endCount);

	res.send(
		JSON.stringify({
			colors: colorsToSend
		})
	);
});

app.get("/api/user/current", (req: any, res) => {
	res.send(
		JSON.stringify({
			userColors: mockDb.userColors
		})
	);
});

app.post("/api/user/current", (req: any, res: any) => {
	const {
		body: { color, add }
	} = req;
	if (add) {
		mockDb.userColors.push(color);
	} else {
		mockDb.userColors = mockDb.userColors.filter(c => c !== color);
	}
	res.send(
		JSON.stringify({
			userColors: mockDb.userColors
		})
	);
});

app.get("/api/user/palettes", (req: any, res: any) => {
	res.send(
		JSON.stringify({
			userPalettes: mockDb.savedPalettes
		})
	);
});

app.post("/api/user/palettes", (req: any, res: any) => {
	const {
		body: {
			data: { add, palette, name }
		}
	} = req;
	if (add) {
		mockDb.savedPalettes.push([name, ...palette]);
	} else {
		mockDb.savedPalettes = mockDb.savedPalettes.filter(p => p[0] !== name);
	}
	res.send(
		JSON.stringify({
			userPalettes: mockDb.savedPalettes
		})
	);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(process.env.PORT || 3001, () =>
	// tslint:disable-next-line
	console.log("Express server is running on localhost:3001")
);
