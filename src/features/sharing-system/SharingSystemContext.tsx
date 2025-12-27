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
	}
	country: {
		position: Position
		textPosition: Position
		name: string
		fontSize: number,
	}
	score: {
		position: Position,
		textPosition: Position
		value: number
		fontSize: number,
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
		},
		country: {
			position: newPosition(),
			textPosition: newPosition(),
			name: "",
			fontSize: 14,
		},
		score: {
			position: newPosition(),
			textPosition: newPosition(),
			value: 0,
			fontSize: 14,
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
		},
		country: {
			position: newPosition(),
			textPosition: newPosition(),
			name: "",
			fontSize: 14
		},
		score: {
			position: newPosition(),
			textPosition: newPosition(),
			value: 0,
			fontSize: 14,
		},
	},
	stage: {
		position: newPosition(),
		textPosition: newPosition(),
		fontSize: 14,
		value: "",
	},
	font: "",
});
