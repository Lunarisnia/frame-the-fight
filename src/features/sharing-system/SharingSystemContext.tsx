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
	score: {
		position: Position,
		value: number
	}
}

interface SharingSystemContextType {
	player1: Player
	player2: Player
	stage: {
		position: Position,
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
			name: "",
			team: ""
		},
		country: {
			position: newPosition(),
			name: ""
		},
		score: {
			position: newPosition(),
			value: 0,
		},
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
		score: {
			position: newPosition(),
			value: 0,
		},
	},
	stage: {
		position: newPosition(),
		value: "",
	}
});
