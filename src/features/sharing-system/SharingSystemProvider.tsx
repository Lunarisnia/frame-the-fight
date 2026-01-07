import { useEffect, useReducer, useState, type FC, type ReactNode } from 'react';
import { SharingSystemContext, type Logo, type Player, type Stage } from './SharingSystemContext';
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
interface VisibilityToggleEvent {
	detail: {
		value: boolean
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

interface ReducerAction {
	type: string
	value: any
}

const playerReducer = (state: Player, action: ReducerAction) => {
	switch (action.type) {
		case "name_plate_position":
			return {
				...state,
				nameplate: {
					...state.nameplate,
					position: action.value,
				}
			} as Player;
		case "score_plate_position":
			return {
				...state,
				score: {
					...state.score,
					position: action.value,
				}
			} as Player;
		case "country_plate_position":
			return {
				...state,
				country: {
					...state.country,
					position: action.value,
				}
			} as Player;
		case "name_text_position":
			return {
				...state,
				nameplate: {
					...state.nameplate,
					textPosition: action.value,
				}
			} as Player;
		case "team_text_position":
			return {
				...state,
				nameplate: {
					...state.nameplate,
					teamTextPosition: action.value,
				}
			} as Player;
		case "score_text_position":
			return {
				...state,
				score: {
					...state.score,
					textPosition: action.value,
				}
			} as Player;
		case "country_text_position":
			return {
				...state,
				country: {
					...state.country,
					textPosition: action.value,
				}
			} as Player;
		default:
			return {
				...action.value
			};
	}
}

const stateReducer = (state: Stage, action: ReducerAction) => {
	switch (action.type) {
		case "plate_position":
			return {
				...state,
				position: action.value
			} as Stage;
		case "name_position":
			return {
				...state,
				textPosition: action.value
			} as Stage;
		default:
			return {
				...action.value
			};
	}
}

const logoReducer = (state: Logo, action: ReducerAction) => {
	switch (action.type) {
		case "position":
			return {
				...state,
				position: action.value,
			} as Logo;
		default:
			return {
				...action.value
			} as Logo;
	}
}

export const SharingSystemProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [activePreset, ___] = useState<Game>("tekken8");
	const [player1, dispatchPlayer1] = useReducer(playerReducer, newPlayerConfig());
	const [player2, dispatchPlayer2] = useReducer(playerReducer, newPlayerConfig());
	const [stage, dispatchStage] = useReducer(stateReducer, { position: { x: 0, y: 0 }, textPosition: { x: 0, y: 0 }, value: "", fontSize: 14, visible: true });
	const [logo, dispatchLogo] = useReducer(logoReducer, { position: { x: 0, y: 0 }, size: { w: 180, h: 180 }, visible: true });
	const [font, setFont] = useState("Roboto");
	const p = getPreset(activePreset);

	useEffect(() => {
		dispatchPlayer1({ type: "update_all", value: p.player1 });
		dispatchPlayer2({ type: "update_all", value: p.player2 });
		dispatchStage({ type: "update_all", value: p.stage });
		dispatchLogo({ type: "update_all", value: p.logo });
		setFont(p.font);
	}, [activePreset])

	const setPlayer1HealthPosition = (x: number, y: number) => {
		dispatchPlayer1({ type: "name_plate_position", value: { x, y } });
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1NamePosition = (x: number, y: number) => {
		dispatchPlayer1({ type: "name_text_position", value: { x, y } });
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1TeamPosition = (x: number, y: number) => {
		dispatchPlayer1({ type: "team_text_position", value: { x, y } });
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1ScorePosition = (x: number, y: number) => {
		dispatchPlayer1({ type: "score_plate_position", value: { x, y } });
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1ScoreTextPosition = (x: number, y: number) => {
		dispatchPlayer1({ type: "score_text_position", value: { x, y } });
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1CountryPosition = (x: number, y: number) => {
		dispatchPlayer1({ type: "country_plate_position", value: { x, y } });
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer1CountryIconPosition = (x: number, y: number) => {
		dispatchPlayer1({ type: "country_text_position", value: { x, y } });
		localStorage.setItem("player1", JSON.stringify(player1));
	}
	const setPlayer2HealthPosition = (x: number, y: number) => {
		dispatchPlayer2({ type: "name_plate_position", value: { x, y } });
		localStorage.setItem("player2", JSON.stringify(player2));
	}
	const setPlayer2NamePosition = (x: number, y: number) => {
		dispatchPlayer2({ type: "name_text_position", value: { x, y } });
		localStorage.setItem("player2", JSON.stringify(player2));
	}
	const setPlayer2TeamPosition = (x: number, y: number) => {
		dispatchPlayer2({ type: "team_text_position", value: { x, y } });
		localStorage.setItem("player2", JSON.stringify(player2));
	}
	const setPlayer2ScorePosition = (x: number, y: number) => {
		dispatchPlayer2({ type: "score_plate_position", value: { x, y } });
		localStorage.setItem("player2", JSON.stringify(player2));
	}
	const setPlayer2ScoreTextPosition = (x: number, y: number) => {
		dispatchPlayer2({ type: "score_text_position", value: { x, y } });
		localStorage.setItem("player2", JSON.stringify(player2));
	}
	const setPlayer2CountryPosition = (x: number, y: number) => {
		dispatchPlayer2({ type: "country_plate_position", value: { x, y } });
		localStorage.setItem("player2", JSON.stringify(player2));
	}
	const setPlayer2CountryIconPosition = (x: number, y: number) => {
		dispatchPlayer2({ type: "country_text_position", value: { x, y } });
		localStorage.setItem("player2", JSON.stringify(player2));
	}

	const setStagePosition = (x: number, y: number) => {
		dispatchStage({ type: "plate_position", value: { x, y } });
		localStorage.setItem("stage", JSON.stringify(stage));
	}
	const setStageNamePosition = (x: number, y: number) => {
		dispatchStage({ type: "name_position", value: { x, y } });
		localStorage.setItem("stage", JSON.stringify(stage));
	}
	const setLogoPosition = (x: number, y: number) => {
		dispatchLogo({ type: "position", value: { x, y } });
		localStorage.setItem("logo", JSON.stringify(logo));
	}

	useEffect(() => {
		WebFont.load({
			google: {
				families: [font]
			}
		});
	}, [])

	useEffect(() => {
		const p1 = localStorage.getItem("player1")
		if (p1 != null) {
			const saved = JSON.parse(p1);
			dispatchPlayer1({ type: "update_all", value: saved });
		}
		const p2 = localStorage.getItem("player2")
		if (p2 != null) {
			const saved = JSON.parse(p2);
			dispatchPlayer2({ type: "update_all", value: saved });
		}
		const s = localStorage.getItem("stage")
		if (s != null) {
			const saved = JSON.parse(s);
			dispatchStage({ type: "update_all", value: saved });
		}
		const l = localStorage.getItem("logo")
		if (l != null) {
			const saved = JSON.parse(l);
			dispatchLogo({ type: "update_all", value: saved });
		}
	}, []);


	// NOTE: We can use this event to communicate from OBS script to control the web
	//window.addEventListener("myTestEvent", function() {
	//	setScore(player1, setPlayer1, player1.score.value + 1);
	//})
	//window.addEventListener("player1_name", (payload: Event) => {
	//	const d = payload as any as UpdateNameEvent;
	//	setName(player1, setPlayer1, `${d.detail.name}`)
	//})
	//window.addEventListener("player1_team", (payload: Event) => {
	//	const d = payload as any as UpdateTeamEvent;
	//	setTeam(player1, setPlayer1, `${d.detail.name}`)
	//})
	//window.addEventListener("player1_country", (payload: Event) => {
	//	const d = payload as any as UpdateCountryEvent;
	//	setCountry(player1, setPlayer1, d.detail.name)
	//})
	//window.addEventListener("player1_score", (payload: Event) => {
	//	const d = payload as any as UpdateScoreEvent;
	//	setScore(player1, setPlayer1, d.detail.score)
	//})
	//
	//window.addEventListener("player2_name", (payload: Event) => {
	//	const d = payload as any as UpdateNameEvent;
	//	setName(player2, setPlayer2, `${d.detail.name}`)
	//})
	//window.addEventListener("player2_team", (payload: Event) => {
	//	const d = payload as any as UpdateTeamEvent;
	//	setTeam(player2, setPlayer2, `${d.detail.name}`)
	//})
	//window.addEventListener("player2_country", (payload: Event) => {
	//	const d = payload as any as UpdateCountryEvent;
	//	setCountry(player2, setPlayer2, d.detail.name)
	//})
	//window.addEventListener("player2_score", (payload: Event) => {
	//	const d = payload as any as UpdateScoreEvent;
	//	setScore(player2, setPlayer2, d.detail.score)
	//})
	//
	//window.addEventListener("group_stage", (payload: Event) => {
	//	const d = payload as any as UpdateGroupStageEvent;
	//	setStage({
	//		...stage,
	//		value: d.detail.name,
	//	})
	//})
	//
	//window.addEventListener("reset_position", () => {
	//	localStorage.clear();
	//	window.location.reload();
	//})
	//
	//window.addEventListener("player1_name_plate", (payload: Event) => {
	//	const d = payload as any as VisibilityToggleEvent;
	//	setPlayer1({
	//		...player1,
	//		nameplate: {
	//			...player1.nameplate,
	//			visible: d.detail.value
	//		}
	//	})
	//})
	//window.addEventListener("player1_score_plate", (payload: Event) => {
	//	const d = payload as any as VisibilityToggleEvent;
	//	setPlayer1({
	//		...player1,
	//		score: {
	//			...player1.score,
	//			visible: d.detail.value
	//		}
	//	})
	//})
	//window.addEventListener("player1_country_plate", (payload: Event) => {
	//	const d = payload as any as VisibilityToggleEvent;
	//	setPlayer1({
	//		...player1,
	//		country: {
	//			...player1.country,
	//			visible: d.detail.value
	//		}
	//	})
	//})
	//
	//window.addEventListener("player2_name_plate", (payload: Event) => {
	//	const d = payload as any as VisibilityToggleEvent;
	//	setPlayer2({
	//		...player2,
	//		nameplate: {
	//			...player2.nameplate,
	//			visible: d.detail.value
	//		}
	//	})
	//})
	//window.addEventListener("player2_score_plate", (payload: Event) => {
	//	const d = payload as any as VisibilityToggleEvent;
	//	setPlayer2({
	//		...player2,
	//		score: {
	//			...player2.score,
	//			visible: d.detail.value
	//		}
	//	})
	//})
	//window.addEventListener("player2_country_plate", (payload: Event) => {
	//	const d = payload as any as VisibilityToggleEvent;
	//	setPlayer2({
	//		...player2,
	//		country: {
	//			...player2.country,
	//			visible: d.detail.value
	//		}
	//	})
	//})
	//
	//window.addEventListener("group_stage_plate", (payload: Event) => {
	//	const d = payload as any as VisibilityToggleEvent;
	//	setStage({
	//		...stage,
	//		visible: d.detail.value,
	//	})
	//})
	//window.addEventListener("tournament_logo_plate", (payload: Event) => {
	//	const d = payload as any as VisibilityToggleEvent;
	//	setLogo({
	//		...logo,
	//		visible: d.detail.value,
	//	})
	//})

	return (
		<SharingSystemContext.Provider value={{
			player1, player2, stage, font, logo,
			setPlayer1HealthPosition, setPlayer1ScorePosition,
			setPlayer1NamePosition, setPlayer1TeamPosition,
			setPlayer1CountryPosition, setPlayer1CountryIconPosition,
			setPlayer1ScoreTextPosition,
			setPlayer2HealthPosition, setPlayer2ScorePosition,
			setPlayer2NamePosition, setPlayer2TeamPosition,
			setPlayer2CountryPosition, setPlayer2CountryIconPosition,
			setPlayer2ScoreTextPosition,
			setStagePosition,
			setStageNamePosition,
			setLogoPosition,
		}}>
			{children}
		</SharingSystemContext.Provider>
	);
};
