import { useEffect, useRef, useState, type FC } from "react";
import styles from "./Frame.module.css";

type FrameComponent = FC<{ src: string, inverse: boolean }>;

const Frame: FrameComponent = ({ src, inverse }) => {
	const imgRef = useRef<HTMLImageElement | null>(null);
	const [size, setSize] = useState({ width: 1920, height: 1080 });
	useEffect(() => {
		const image = imgRef.current;
		if (image != null) {
			const bodyWidth = window.getComputedStyle(document.body).width;
			const bodyHeight = window.getComputedStyle(document.body).height;
			const scale = Math.min(parseInt(bodyWidth) / 1920, parseInt(bodyHeight) / 1080);
			setSize({ width: image.naturalWidth * scale, height: image.naturalHeight * scale });
		}
	}, [])
	return <img ref={imgRef} src={src} className={`${inverse ? styles.flipHorizontal : ""}`} style={{ pointerEvents: 'none', width: `${size.width}px`, height: `${size.height}` }} />
}

export { Frame }
