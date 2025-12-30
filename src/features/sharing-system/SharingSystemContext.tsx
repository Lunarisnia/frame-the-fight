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
	player2: Player
	stage: {
		position: Position,
		textPosition: Position
		value: string
		fontSize: number,
		visible: boolean,
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
	font: "",
});
