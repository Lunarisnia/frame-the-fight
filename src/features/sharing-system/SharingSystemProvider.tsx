import { useEffect, useState, type FC, type ReactNode } from 'react';
import { SharingSystemContext, type Player } from './SharingSystemContext';
import { getPreset, type Game } from '../preset-manager/PresetManager';
import WebFont from 'webfontloader';
import { country } from '../../constants/country';

interface UpdateNameEvent {
	detail: {
		name: string
	}
}
interface UpdateTeamEvent {
	detail: {
		name: string
	}
}
interface UpdateScoreEvent {
	detail: {
		score: number
	}
}
interface UpdateCountryEvent {
	detail: {
		name: string
	}
}

const newPlayerConfig = () => {
	return {
		nameplate: {
			position: { x: 0, y: 0 },
			textPosition: { x: 0, y: 0 },
			teamTextPosition: { x: 0, y: 0 },
			name: "",
			team: "",
			teamFontSize: 14,
			nameFontSize: 14,
			visible: true,
		},
		country: {
			position: { x: 0, y: 0 },
			textPosition: { x: 0, y: 0 },
			name: "",
			fontSize: 14,
			visible: true,
		},
		score: {
			position: { x: 0, y: 0 },
			textPosition: { x: 0, y: 0 },
			value: 0,
			fontSize: 14,
			visible: true,
		},
	};
}

const setName = (player: Player, setPlayer: (player: Player) => void, name: string) => {
	setPlayer({
		...player,
		nameplate: {
			...player.nameplate,
			name: name,
		}
	});
}

const setTeam = (player: Player, setPlayer: (player: Player) => void, name: string) => {
	setPlayer({
		...player,
		nameplate: {
			...player.nameplate,
			team: name,
		}
	});
}

const setCountry = (player: Player, setPlayer: (player: Player) => void, name: string) => {
	setPlayer({
		...player,
		country: {
			...player.country,
			name: country[name],
		}
	});
}

const setScore = (player: Player, setPlayer: (player: Player) => void, score: number) => {
	setPlayer({
		...player,
		score: {
			...player.score,
			value: score,
		}
	});
}

const setHealthbarPosition = (player: Player, setPlayer: (player: Player) => void, x: number, y: number) => {
	setPlayer({
		...player,
		nameplate: {
			...player.nameplate,
			position: {
				x: x,
				y: y,
			}
		}
	})

}

export const SharingSystemProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [activePreset, ___] = useState<Game>("tekken8");
	const [player1, setPlayer1] = useState(newPlayerConfig());
	const [player2, setPlayer2] = useState(newPlayerConfig());
	const [stage, setStage] = useState({ position: { x: 0, y: 0 }, textPosition: { x: 0, y: 0 }, value: "", fontSize: 14, visible: true });
	const [logo, setLogo] = useState({ position: { x: 0, y: 0 }, size: { w: 180, h: 180 }, visible: true });
	const [font, setFont] = useState("Roboto");
	const p = getPreset(activePreset);

	useEffect(() => {
		setPlayer1(p.player1);
		setPlayer2(p.player2);
		setStage(p.stage);
		setLogo(p.logo);
		setFont(p.font);
	}, [activePreset])

	const setPlayer1HealthPos = (x: number, y: number) => {
		setHealthbarPosition(player1, setPlayer1, x, y);
	}

	useEffect(() => {
		WebFont.load({
			google: {
				families: [font]
			}
		});
	}, [])
	//send_json_to_browser("player1_team", string.format('{"name":"%s"}', player1_team))
	//local player1_country = obs.obs_data_get_string(settings, "player1_country")
	//send_json_to_browser("player1_country", string.format('{"name":"%s"}', player1_country))
	//local player1_score = obs.obs_data_get_int(settings, "player1_score")
	//send_json_to_browser("player1_score", string.format('{"":%d}', player1_score))

	// NOTE: We can use this event to communicate from OBS script to control the web
	//window.addEventListener("myTestEvent", function() {
	//	setScore(player1, setPlayer1, player1.score.value + 1);
	//})
	window.addEventListener("player1_name", (payload: Event) => {
		const d = payload as any as UpdateNameEvent;
		setName(player1, setPlayer1, `${d.detail.name}`)
	})
	window.addEventListener("player1_team", (payload: Event) => {
		const d = payload as any as UpdateTeamEvent;
		setTeam(player1, setPlayer1, `${d.detail.name}`)
	})
	window.addEventListener("player1_country", (payload: Event) => {
		const d = payload as any as UpdateCountryEvent;
		setCountry(player1, setPlayer1, d.detail.name)
	})
	window.addEventListener("player1_score", (payload: Event) => {
		const d = payload as any as UpdateScoreEvent;
		setScore(player1, setPlayer1, d.detail.score)
	})

	return (
		<SharingSystemContext.Provider value={{ player1, player2, stage, font, logo, setPlayer1HealthPosPosition: setPlayer1HealthPos }}>
			{children}
		</SharingSystemContext.Provider>
	);
};
