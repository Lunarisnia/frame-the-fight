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
interface UpdateGroupStageEvent {
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
const setScorePosition = (player: Player, setPlayer: (player: Player) => void, x: number, y: number) => {
	setPlayer({
		...player,
		score: {
			...player.score,
			position: {
				x: x,
				y: y,
			}
		}
	})

}
const setScoreTextPosition = (player: Player, setPlayer: (player: Player) => void, x: number, y: number) => {
	setPlayer({
		...player,
		score: {
			...player.score,
			textPosition: {
				x: x,
				y: y,
			}
		}
	})

}
const setCountryPosition = (player: Player, setPlayer: (player: Player) => void, x: number, y: number) => {
	setPlayer({
		...player,
		country: {
			...player.country,
			position: {
				x: x,
				y: y,
			}
		}
	})

}

const setCountryIconPosition = (player: Player, setPlayer: (player: Player) => void, x: number, y: number) => {
	setPlayer({
		...player,
		country: {
			...player.country,
			textPosition: {
				x: x,
				y: y,
			}
		}
	})

}
const setNamePosition = (player: Player, setPlayer: (player: Player) => void, x: number, y: number) => {
	setPlayer({
		...player,
		nameplate: {
			...player.nameplate,
			textPosition: {
				x,
				y
			}
		}
	})

}
const setTeamPosition = (player: Player, setPlayer: (player: Player) => void, x: number, y: number) => {
	setPlayer({
		...player,
		nameplate: {
			...player.nameplate,
			teamTextPosition: {
				x,
				y
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

	const setPlayer1HealthPosition = (x: number, y: number) => {
		setHealthbarPosition(player1, setPlayer1, x, y);
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1NamePosition = (x: number, y: number) => {
		setNamePosition(player1, setPlayer1, x, y);
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1TeamPosition = (x: number, y: number) => {
		setTeamPosition(player1, setPlayer1, x, y);
		localStorage.setItem("player1", JSON.stringify(player1));
	}

	const setPlayer1ScorePosition = (x: number, y: number) => {
		setScorePosition(player1, setPlayer1, x, y);
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1ScoreTextPosition = (x: number, y: number) => {
		setScoreTextPosition(player1, setPlayer1, x, y);
		localStorage.setItem("player1", JSON.stringify(player1));
	}

	const setPlayer1CountryPosition = (x: number, y: number) => {
		setCountryPosition(player1, setPlayer1, x, y);
		localStorage.setItem("player1", JSON.stringify(player1));
	}

	const setPlayer1CountryIconPosition = (x: number, y: number) => {
		setCountryIconPosition(player1, setPlayer1, x, y);
		localStorage.setItem("player1", JSON.stringify(player1));
	}

	useEffect(() => {
		WebFont.load({
			google: {
				families: [font]
			}
		});
	}, [])

	useEffect(() => {
		const savedPos = localStorage.getItem("player1")
		if (savedPos != null) {
			const saved = JSON.parse(savedPos);
			setPlayer1(saved);
		}
	}, []);

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

	window.addEventListener("player2_name", (payload: Event) => {
		const d = payload as any as UpdateNameEvent;
		setName(player2, setPlayer2, `${d.detail.name}`)
	})
	window.addEventListener("player2_team", (payload: Event) => {
		const d = payload as any as UpdateTeamEvent;
		setTeam(player2, setPlayer2, `${d.detail.name}`)
	})
	window.addEventListener("player2_country", (payload: Event) => {
		const d = payload as any as UpdateCountryEvent;
		setCountry(player2, setPlayer2, d.detail.name)
	})
	window.addEventListener("player2_score", (payload: Event) => {
		const d = payload as any as UpdateScoreEvent;
		setScore(player2, setPlayer2, d.detail.score)
	})

	window.addEventListener("group_stage", (payload: Event) => {
		const d = payload as any as UpdateGroupStageEvent;
		setStage({
			...stage,
			value: d.detail.name,
		})
	})

	window.addEventListener("reset_position", () => {
		localStorage.clear();
		window.location.reload();
	})

	return (
		<SharingSystemContext.Provider value={{
			player1, player2, stage, font, logo,
			setPlayer1HealthPosition, setPlayer1ScorePosition,
			setPlayer1NamePosition, setPlayer1TeamPosition,
			setPlayer1CountryPosition, setPlayer1CountryIconPosition,
			setPlayer1ScoreTextPosition,
		}}>
			{children}
		</SharingSystemContext.Provider>
	);
};
