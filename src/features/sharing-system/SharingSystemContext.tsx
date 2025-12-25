import { createContext } from 'react';

interface Position {
	x: number
	y: number
}

interface Player {
	nameplate: {
		position: Position
		team: string
		name: string
	}
	country: {
		position: Position
		name: string
	}
	score: number
}

interface SharingSystemContextType {
	player1: Player
	player2: Player
}

const newPosition = () => {
	return { x: 0, y: 0 };
}

export const SharingSystemContext = createContext<SharingSystemContextType>({
	player1: {
		nameplate: {
			position: newPosition(),
			name: "",
			team: ""
		},
		country: {
			position: newPosition(),
			name: ""
		},
		score: 0
	},
	player2: {
		nameplate: {
			position: newPosition(),
			name: "",
			team: ""
		},
		country: {
			position: newPosition(),
			name: ""
		},
		score: 0
	},
});
