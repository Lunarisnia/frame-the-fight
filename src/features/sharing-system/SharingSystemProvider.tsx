import { type FC, type ReactNode } from 'react';
import { SharingSystemContext } from './SharingSystemContext';


export const SharingSystemProvider: FC<{ children: ReactNode }> = ({ children }) => {
	//const [p1HealthBarPos, setP1HealthBar] = useState({ x: 992, y: 0 });
	let p1HealthBarPos = { x: 992, y: 0 };
	const setP1HealthBarPos = (x: number, y: number) => {
		//setP1HealthBar({ x: x, y: y });
		p1HealthBarPos.x = x;
		p1HealthBarPos.y = y;
	}

	//useEffect(() => {
	//	const params = new URLSearchParams(window.location.search);
	//	console.log(params.get("q"));
	//	document.addEventListener("keydown", e => {
	//		if (e.key == "S") {
	//			//const serialized = {
	//			//	p1HealthBarPos,
	//			//}
	//			//console.log(, "HP");
	//		}
	//	})
	//}, [])

	return (
		<SharingSystemContext.Provider value={{ p1HealthBarPos, setP1HealthBarPos }}>
			{children}
		</SharingSystemContext.Provider>
	);
};
