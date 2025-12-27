import { useEffect, useState, type FC, type ReactNode } from 'react';
import { SharingSystemContext, type Player } from './SharingSystemContext';
import { getPreset, type Game } from '../preset-manager/PresetManager';


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


export const setScore = (player: Player, setPlayer: (player: Player) => void, score: number) => {
	setPlayer({
		...player,
		score: {
			...player.score,
			value: score,
		}
	});
}

export const SharingSystemProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [activePreset, ___] = useState<Game>("tekken8");
	const [player1, setPlayer1] = useState(newPlayerConfig());
	const [player2, setPlayer2] = useState(newPlayerConfig());
	const [stage, setStage] = useState({ position: { x: 0, y: 0 }, textPosition: { x: 0, y: 0 }, value: "" });
	const p = getPreset(activePreset);

	useEffect(() => {
		setPlayer1(p.player1);
		setPlayer2(p.player2);
		setStage(p.stage);
	}, [activePreset])

	// NOTE: We can use this event to communicate from OBS script to control the web
	window.addEventListener("myTestEvent", function() {
		setScore(player1, setPlayer1, player1.score.value + 1);
	})

	return (
		<SharingSystemContext.Provider value={{ player1, player2, stage }}>
			{children}
		</SharingSystemContext.Provider>
	);
};
