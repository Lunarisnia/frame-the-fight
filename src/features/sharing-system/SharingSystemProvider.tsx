import { useState, type FC, type ReactNode } from 'react';
import { SharingSystemContext } from './SharingSystemContext';


export const SharingSystemProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [p1HealthBarPos, setP1HealthBar] = useState({ x: 0, y: 0 });
	const setP1HealthBarPos = (x: number, y: number) => {
		setP1HealthBar({ x, y });
	}

	// NOTE: We can use this event to communicate from OBS script to control the web
	window.addEventListener("myTestEvent", function() {
		setP1HealthBarPos(p1HealthBarPos.x + 10, p1HealthBarPos.y + 10);
	})

	return (
		<SharingSystemContext.Provider value={{ p1HealthBarPos, setP1HealthBarPos }}>
			{children}
		</SharingSystemContext.Provider>
	);
};
