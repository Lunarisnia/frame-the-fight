import { useState, type FC, type ReactNode } from 'react';
import { SharingSystemContext } from './SharingSystemContext';


const newPlayerConfig = () => {
	return {
		nameplate: {
			position: { x: 0, y: 0 },
			textPosition: { x: 0, y: 0 },
			teamTextPosition: { x: 0, y: 0 },
			name: "",
			team: ""
		},
		country: {
			position: { x: 0, y: 0 },
			textPosition: { x: 0, y: 0 },
			name: ""
		},
		score: {
			position: { x: 0, y: 0 },
			textPosition: { x: 0, y: 0 },
			value: 0,
		},
	};
}

export const SharingSystemProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [player1, setPlayer1] = useState(newPlayerConfig());
	const [player2, _] = useState(newPlayerConfig());
	const [stage, __] = useState({ position: { x: 0, y: 0 }, textPosition: { x: 0, y: 0 }, value: "" });

	// NOTE: We can use this event to communicate from OBS script to control the web
	window.addEventListener("myTestEvent", function() {
		setPlayer1({
			...player1,
			nameplate: {
				...player1.nameplate,
				position: {
					x: player1.nameplate.position.x + 20,
					y: player1.nameplate.position.y + 20,
				}
			}
		});
	})

	return (
		<SharingSystemContext.Provider value={{ player1, player2, stage }}>
			{children}
		</SharingSystemContext.Provider>
	);
};
