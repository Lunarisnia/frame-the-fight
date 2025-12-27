import { createContext } from 'react';
import { country } from '../../constants/country';

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
	}
	country: {
		position: Position
		textPosition: Position
		name: string
	}
	score: {
		position: Position,
		textPosition: Position
		value: number
	}
}

export interface SharingSystemContextType {
	player1: Player
	player2: Player
	stage: {
		position: Position,
		textPosition: Position
		value: string
	}
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
			team: ""
		},
		country: {
			position: newPosition(),
			textPosition: newPosition(),
			name: country["ID"]
		},
		score: {
			position: newPosition(),
			textPosition: newPosition(),
			value: 0,
		},
	},
	player2: {
		nameplate: {
			position: newPosition(),
			teamTextPosition: newPosition(),
			textPosition: newPosition(),
			name: "",
			team: ""
		},
		country: {
			position: newPosition(),
			textPosition: newPosition(),
			name: country["UK"]
		},
		score: {
			position: newPosition(),
			textPosition: newPosition(),
			value: 0,
		},
	},
	stage: {
		position: newPosition(),
		textPosition: newPosition(),
		value: "",
	}
});
