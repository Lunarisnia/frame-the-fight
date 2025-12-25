import { useEffect, type FC, type ReactNode } from 'react';
import { SharingSystemContext } from './SharingSystemContext';


export const SharingSystemProvider: FC<{ children: ReactNode }> = ({ children }) => {
	let p1HealthBarPos = { x: 0, y: 0 };
	const setP1HealthBarPos = (x: number, y: number) => {
		p1HealthBarPos.x = x;
		p1HealthBarPos.y = y;
	}

	useEffect(() => {
		window.addEventListener("myTestEvent", function() {
			document.body.append("Hello, world!")
		})
	}, [])


	return (
		<SharingSystemContext.Provider value={{ p1HealthBarPos, setP1HealthBarPos }}>
			{children}
		</SharingSystemContext.Provider>
	);
};
