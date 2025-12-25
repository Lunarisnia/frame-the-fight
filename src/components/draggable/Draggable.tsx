import { useEffect, useRef, useState, type FC, type MouseEvent, type ReactNode } from "react";
import styles from "./Draggable.module.css";

type DraggableComponent = FC<{ children: ReactNode, x: number, y: number }>;

const Draggable: DraggableComponent = ({ children, x, y }) => {
	const [dragged, setDragged] = useState(false);
	const [clickLocation, setClickLocation] = useState({ x: 0, y: 0 });
	const boxRef = useRef<HTMLDivElement | null>(null);

	const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		const box = boxRef.current;
		if (box != null) {
			setDragged(true);
			const boundingBox = box.getBoundingClientRect();
			const xi = e.clientX - boundingBox.left;
			const yi = e.clientY - boundingBox.top;
			setClickLocation({ x: xi, y: yi });
		}
	}
	const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const box = boxRef.current;
		if (dragged && box != null) {
			const xi = e.clientX - clickLocation.x;
			const yi = e.clientY - clickLocation.y;
			box.style.transform = `translate(${xi}px, ${yi}px)`
			// NOTE: maybe I need to update the position in the sharing system
		}
	}
	const onMouseUp = () => {
		setDragged(false);
	}

	useEffect(() => {
		const box = boxRef.current;
		if (box != null) {
			const bodyWidth = window.getComputedStyle(document.body).width;
			const bodyHeight = window.getComputedStyle(document.body).height;
			const scale = {
				w: parseInt(bodyWidth) / 1920,
				h: parseInt(bodyHeight) / 1080,
			}
			box.style.transform = `translate(${x * scale.w}px, ${y * scale.h}px)`;
		}
	}, [x, y]);

	return <div
		ref={boxRef}
		onMouseDown={onMouseDown}
		onMouseMove={onMouseMove}
		onMouseUp={onMouseUp}
		className={`${styles.draggable}`}
	>
		{children}
	</div>

}

export { Draggable }
