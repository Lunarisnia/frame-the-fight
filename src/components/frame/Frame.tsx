import { useRef, type FC } from "react";
import styles from "./Frame.module.css";

type FrameComponent = FC<{ src: string, inverse: boolean, width?: number, height?: number }>;

const Frame: FrameComponent = ({ src, inverse, width, height }) => {
	const props: any = {};
	if (width != undefined && height != undefined) {
		props.width = `${width}px`;
		props.height = `${height}px`;
	}
	const imgRef = useRef<HTMLImageElement | null>(null);
	return <img ref={imgRef} src={src} className={`${inverse ? styles.flipHorizontal : ""}`} style={{ pointerEvents: 'none', ...props }} />
}

export { Frame }
