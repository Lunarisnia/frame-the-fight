import { createContext } from 'react';

interface Position {
	x: number
	y: number
}

interface SharingSystemContextType {
	p1HealthBarPos: Position

	setP1HealthBarPos: (x: number, y: number) => void
}

export const SharingSystemContext = createContext<SharingSystemContextType>({
	p1HealthBarPos: {
		x: 0,
		y: 0
	},
	setP1HealthBarPos: () => { },
});
