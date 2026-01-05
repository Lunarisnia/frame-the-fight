import { createContext } from 'react';

interface Position {
	x: number
	y: number
}

export interface Player {
	nameplate: {
		position: Position
		textPosition: Position
		teamTextPosition: Position
		team: string
		name: string
		nameFontSize: number,
		teamFontSize: number,
		visible: boolean,
	}
	country: {
		position: Position
		textPosition: Position
		name: string
		fontSize: number,
		visible: boolean,
	}
	score: {
		position: Position,
		textPosition: Position
		value: number
		fontSize: number,
		visible: boolean,
	}
}

export interface SharingSystemContextType {
	player1: Player
	setPlayer1HealthPosition: (x: number, y: number) => void
	setPlayer1ScorePosition: (x: number, y: number) => void
	setPlayer1ScoreTextPosition: (x: number, y: number) => void
	setPlayer1NamePosition: (x: number, y: number) => void
	setPlayer1TeamPosition: (x: number, y: number) => void
	setPlayer1CountryPosition: (x: number, y: number) => void
	setPlayer1CountryIconPosition: (x: number, y: number) => void
	player2: Player
	stage: {
		position: Position
		textPosition: Position
		value: string
		fontSize: number
		visible: boolean
	}
	logo: {
		position: Position
		visible: boolean
		size: {
			w: number
			h: number
		},
	}
	font: string
}

const newPosition = () => {
	return { x: 0, y: 0 };
}

export const SharingSystemContext = createContext<SharingSystemContextType>({
	player1: {
		nameplate: {
			position: newPosition(),
			teamTextPosition: newPosition(),
			textPosition: newPosition(),
			name: "",
			team: "",
			nameFontSize: 14,
			teamFontSize: 14,
			visible: true,
		},
		country: {
			position: newPosition(),
			textPosition: newPosition(),
			name: "",
			fontSize: 14,
			visible: true,
		},
		score: {
			position: newPosition(),
			textPosition: newPosition(),
			value: 0,
			fontSize: 14,
			visible: true,
		},
	},
	setPlayer1HealthPosition: () => {

	},
	setPlayer1TeamPosition: () => {

	},
	setPlayer1ScorePosition: () => {

	},
	setPlayer1CountryPosition: () => {

	},
	setPlayer1NamePosition: () => {

	},
	player2: {
		nameplate: {
			position: newPosition(),
			teamTextPosition: newPosition(),
			textPosition: newPosition(),
			name: "",
			team: "",
			nameFontSize: 14,
			teamFontSize: 14,
			visible: true,
		},
		country: {
			position: newPosition(),
			textPosition: newPosition(),
			name: "",
			fontSize: 14,
			visible: true,
		},
		score: {
			position: newPosition(),
			textPosition: newPosition(),
			value: 0,
			fontSize: 14,
			visible: true,
		},
	},
	stage: {
		position: newPosition(),
		textPosition: newPosition(),
		fontSize: 14,
		value: "",
		visible: true,
	},
	logo: {
		size: {
			h: 180,
			w: 180,
		},
		position: newPosition(),
		visible: true,
	},
	font: "",
});
