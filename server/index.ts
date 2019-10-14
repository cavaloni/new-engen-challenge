import bodyParser from "body-parser";
import express from "express";
import path from "path";
import colors from "./colors";

const app = express();
app.use(bodyParser());

app.use(express.static(path.join(__dirname, "../build")));

const urlPrefix = process.env.NODE_ENV === "production" ? "" : "/api";

// In the interest of time, its a mock DB
const mockDb: { userColors: string[]; savedPalettes: string[][] } = {
	savedPalettes: [],
	userColors: []
};

app.get(`${urlPrefix}/colors`, (req: any, res) => {
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

app.get(`${urlPrefix}/user/current`, (req: any, res) => {
	res.send(
		JSON.stringify({
			userColors: mockDb.userColors
		})
	);
});

app.post(`${urlPrefix}/user/current`, (req: any, res: any) => {
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

app.get(`${urlPrefix}/user/palettes`, (req: any, res: any) => {
	res.send(
		JSON.stringify({
			userPalettes: mockDb.savedPalettes
		})
	);
});

app.post(`${urlPrefix}/user/palettes`, (req: any, res: any) => {
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

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname + "/../build/index.html"));
});

app.listen(process.env.PORT || 3001, () =>
	// tslint:disable-next-line
	console.log("Express server is running on localhost:3001")
);
