import { createContext } from 'react';

interface Position {
	x: number
	y: number
}

export interface Stage {
	position: Position
	textPosition: Position
	fontSize: number
	value: string
	visible: boolean
	artwork: string,
}

export interface Logo {
	position: Position
	visible: boolean
	size: {
		w: number
		h: number
	}
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
		artwork: string,
		visible: boolean,
	}
	country: {
		position: Position
		textPosition: Position
		name: string
		fontSize: number,
		artwork: string,
		visible: boolean,
	}
	score: {
		position: Position,
		textPosition: Position
		value: number
		fontSize: number,
		visible: boolean,
		artwork: string,
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

	setPlayer2HealthPosition: (x: number, y: number) => void
	setPlayer2ScorePosition: (x: number, y: number) => void
	setPlayer2ScoreTextPosition: (x: number, y: number) => void
	setPlayer2NamePosition: (x: number, y: number) => void
	setPlayer2TeamPosition: (x: number, y: number) => void
	setPlayer2CountryPosition: (x: number, y: number) => void
	setPlayer2CountryIconPosition: (x: number, y: number) => void

	setStagePosition: (x: number, y: number) => void
	setStageNamePosition: (x: number, y: number) => void
	setLogoPosition: (x: number, y: number) => void
	player2: Player
	stage: Stage
	logo: Logo
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
			artwork: "nameplate.png",
			visible: true,
		},
		country: {
			position: newPosition(),
			textPosition: newPosition(),
			name: "",
			fontSize: 14,
			visible: true,
			artwork: "country.png",
		},
		score: {
			position: newPosition(),
			textPosition: newPosition(),
			value: 0,
			fontSize: 14,
			visible: true,
			artwork: "score.png"
		},
	},
	setLogoPosition() {

	},
	setStageNamePosition() {

	},
	setStagePosition() {

	},
	setPlayer2ScoreTextPosition() {

	},
	setPlayer2CountryIconPosition() {

	},
	setPlayer2NamePosition() {

	},
	setPlayer1ScoreTextPosition() {

	},
	setPlayer1CountryIconPosition() {

	},
	setPlayer2CountryPosition() {

	},
	setPlayer2HealthPosition() {

	},
	setPlayer2ScorePosition() {

	},
	setPlayer2TeamPosition() {

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
			artwork: "nameplate.png",
		},
		country: {
			position: newPosition(),
			textPosition: newPosition(),
			name: "",
			fontSize: 14,
			visible: true,
			artwork: "country.png",
		},
		score: {
			position: newPosition(),
			textPosition: newPosition(),
			value: 0,
			fontSize: 14,
			visible: true,
			artwork: "score.png"
		},
	},
	stage: {
		position: newPosition(),
		textPosition: newPosition(),
		fontSize: 14,
		value: "",
		visible: true,
		artwork: "group.png",
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
