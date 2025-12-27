import { useRef, type FC } from "react";
import styles from "./Frame.module.css";

type FrameComponent = FC<{ src: string, inverse: boolean }>;

const Frame: FrameComponent = ({ src, inverse }) => {
	const imgRef = useRef<HTMLImageElement | null>(null);
	return <img ref={imgRef} src={src} className={`${inverse ? styles.flipHorizontal : ""}`} style={{ pointerEvents: 'none' }} />
}

export { Frame }
