import { useEffect, useRef, type FC, type MouseEvent, type ReactNode } from "react";
import styles from "./Draggable.module.css";

type DraggableComponent = FC<{ children: ReactNode }>;

const Draggable: DraggableComponent = ({ children }) => {
	const boxRef = useRef<HTMLDivElement | null>(null);
	let dragged = false;
	const clickLocation = {
		x: 0,
		y: 0,
	};

	const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		const box = boxRef.current;
		if (box != null) {
			dragged = true;
			const boundingBox = box.getBoundingClientRect();
			clickLocation.x = e.clientX - boundingBox.left;
			clickLocation.y = e.clientY - boundingBox.top;
		}
	}

	useEffect(() => {
		const box = boxRef.current;
		if (box != null) {
			document.addEventListener("mousemove", (e) => {
				if (dragged) {
					box.style.transform = `translate(${e.clientX - clickLocation.x}px, ${e.clientY - clickLocation.y}px)`
				}
			})
			document.addEventListener("mouseup", () => {
				dragged = false;
			})
		}
	}, []);

	return <div
		ref={boxRef}
		onMouseDown={onMouseDown}
		className={`${styles.draggable}`}
	>
		{children}
	</div>

}

export { Draggable }
