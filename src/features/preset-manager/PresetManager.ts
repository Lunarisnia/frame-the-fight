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
				team: "TEAM1"
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
				name: country["ID"]
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
				team: "TEAM2"
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
				name: country["GB"]
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
			value: "Grand Final"
		},
		font: "Roboto"
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
				team: ""
			},
			country: {
				position: {
					x: 170,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				name: ""
			},
			score: {
				position: {
					x: 590,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				value: 0,
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
				team: ""
			},
			country: {
				position: {
					x: 170,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				name: ""
			},
			score: {
				position: {
					x: 590,
					y: 10,
				},
				textPosition: { x: 0, y: 0 },
				value: 0,
			},
		},
		stage: {
			position: { x: 0, y: 0 },
			textPosition: { x: 0, y: 0 },
			value: ""
		},
		font: "Roboto"
	}
}

export const getPreset = (game: Game) => {
	return preset[game]
}

