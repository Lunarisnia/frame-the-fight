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

	useEffect(() => {
		const box = boxRef.current;
		if (box != null) {
			const bodyWidth = window.getComputedStyle(document.body).width;
			const bodyHeight = window.getComputedStyle(document.body).height;
			//let scale = Math.min(parseInt(bodyWidth) / 858, parseInt(bodyHeight) / 730);
			const scale = {
				// TODO: should be divided by the original saved resolution
				// NOTE: or we could save everything in 1920x1080 and rescale down to the target
				w: parseInt(bodyWidth) / 858,
				h: parseInt(bodyHeight) / 730,
				//w: 1920 / parseInt(bodyWidth),
				//h: 1080 / parseInt(bodyHeight),
			}

			if (parseInt(bodyWidth) == 858) {
				//scale = 1
				scale.w = 1;
				scale.h = 1;
			}
			// 797x994
			// 858x730
			//transform: translate(597px, 578px);
			//box.style.transform = `translate(${x * scale}px, ${y * scale}px)`;
			box.style.transform = `translate(${x * scale.w}px, ${y * scale.h}px)`;
			//box.style.transform = `translate(${x}px, ${y}px)`;
			//box.style.top = `${y * scale.h}px`;
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
