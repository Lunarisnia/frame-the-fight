import { useEffect, useRef, type FC, type MouseEvent, type ReactNode } from "react";
import styles from "./Draggable.module.css";

type DraggableComponent = FC<{ children: ReactNode, x: number, y: number }>;

const Draggable: DraggableComponent = ({ children, x, y }) => {
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
	const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const box = boxRef.current;
		if (dragged && box != null) {
			const xi = e.clientX - clickLocation.x;
			const yi = e.clientY - clickLocation.y;
			box.style.transform = `translate(${xi}px, ${yi}px)`
		}
	}
	const onMouseUp = () => {
		dragged = false;
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
	}, []);

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
