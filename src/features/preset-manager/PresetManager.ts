import { country } from "../../constants/country";
import type { SharingSystemContextType } from "../sharing-system/SharingSystemContext"

interface Preset {
	tekken8: SharingSystemContextType
	streetFighter6: SharingSystemContextType
}

export type Game = "tekken8" | "streetFighter6";

const preset: Preset = {
	tekken8: {
		player1: {
			nameplate: {
				position: {
					x: 200,
					y: 10,
				},
				textPosition: {
					x: 380,
					y: 0
				},
				teamTextPosition: {
					x: 260,
					y: 0,
				},
				name: "Player 1",
				team: "TEAM1",
				nameFontSize: 15,
				teamFontSize: 15,
				artwork: "nameplate.png",
				visible: true,
			},
			country: {
				position: {
					x: 170,
					y: 10,
				},
				textPosition: {
					x: 195,
					y: 0
				},
				name: country["ID"],
				fontSize: 15,
				visible: true,
			},
			score: {
				position: {
					x: 590,
					y: 10,
				},
				textPosition: {
					x: 649,
					y: 0
				},
				value: 0,
				fontSize: 15,
				visible: true,
			},
		},
		player2: {
			nameplate: {
				position: {
					x: 1280,
					y: 10,
				},
				textPosition: {
					x: 1460,
					y: 0
				},
				teamTextPosition: {
					x: 1340,
					y: 0
				},
				name: "Player 2 (L)",
				artwork: "nameplate.png",
				team: "TEAM2",
				nameFontSize: 15,
				teamFontSize: 15,
				visible: true,
			},
			country: {
				position: {
					x: 1660,
					y: 10,
				},
				textPosition: {
					x: 1686,
					y: 0
				},
				name: country["GB"],
				fontSize: 15,
				visible: true,
			},
			score: {
				position: {
					x: 1200,
					y: 10,
				},
				textPosition: {
					x: 1259,
					y: 0
				},
				value: 0,
				fontSize: 15,
				visible: true,
			},
		},
		stage: {
			position: {
				x: 812,
				y: 0
			},
			textPosition: {
				x: 872,
				y: -22,
			},
			value: "Grand Final",
			fontSize: 15,
			visible: true,
		},
		font: '"Roboto"',
		logo: {
			position: {
				x: 862,
				y: 900,
			},
			size: {
				w: 180,
				h: 180,
			},
			visible: true,
		},
		setPlayer2TeamPosition() {

		},
		setPlayer2ScorePosition() {

		},
		setPlayer2HealthPosition() {

		},
		setPlayer2CountryPosition() {

		},
		setPlayer1CountryIconPosition() {

		},
		setPlayer1ScoreTextPosition() {

		},
		setPlayer2NamePosition() {

		},
		setPlayer2CountryIconPosition() {

		},
		setPlayer2ScoreTextPosition() {

		},
		setStagePosition() {

		},
		setStageNamePosition() {

		},
		setLogoPosition() {

		},
		setPlayer1TeamPosition() {

		},
		setPlayer1CountryPosition() {

		},
		setPlayer1ScorePosition() {

		},
		setPlayer1HealthPosition() {

		},
		setPlayer1NamePosition() {

		},
	},
	streetFighter6: {
		player1: {
			nameplate: {
				position: {
					x: 200,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				teamTextPosition: { x: 0, y: 0 },
				name: "",
				team: "",
				nameFontSize: 14,
				teamFontSize: 14,
				visible: true,
			},
			country: {
				position: {
					x: 170,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				name: "",
				fontSize: 14,
				visible: true,
			},
			score: {
				position: {
					x: 590,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				value: 0,
				fontSize: 14,
				visible: true,
			},
		},
		player2: {
			nameplate: {
				position: {
					x: 200,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				teamTextPosition: { x: 0, y: 0 },
				name: "",
				team: "",
				nameFontSize: 14,
				teamFontSize: 14,
				visible: true,
			},
			country: {
				position: {
					x: 170,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				name: "",
				fontSize: 14,
				visible: true,
			},
			score: {
				position: {
					x: 590,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				value: 0,
				fontSize: 14,
				visible: true,
			},
		},
		stage: {
			position: { x: 0, y: 0 },
			textPosition: { x: 0, y: 0 },
			value: "",
			fontSize: 14,
			visible: true,
		},
		font: "Roboto",
		logo: {
			position: {
				x: 862,
				y: 900,
			},
			size: {
				w: 180,
				h: 180,
			},
			visible: true,
		},
		setPlayer2TeamPosition() {

		},
		setPlayer2ScorePosition() {

		},
		setPlayer2HealthPosition() {

		},
		setPlayer2CountryPosition() {

		},
		setPlayer1CountryIconPosition() {

		},
		setPlayer1ScoreTextPosition() {

		},
		setPlayer2NamePosition() {

		},
		setPlayer2CountryIconPosition() {

		},
		setPlayer2ScoreTextPosition() {

		},
		setStagePosition() {

		},
		setStageNamePosition() {

		},
		setLogoPosition() {

		},
		setPlayer1TeamPosition() {

		},
		setPlayer1CountryPosition() {

		},
		setPlayer1ScorePosition() {

		},
		setPlayer1HealthPosition() {

		},
		setPlayer1NamePosition() {

		},
	}
}

export const getPreset = (game: Game) => {
	return preset[game]
}

