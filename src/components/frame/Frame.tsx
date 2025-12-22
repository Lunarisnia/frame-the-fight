import { useEffect, useRef, useState, type FC } from "react";

type FrameComponent = FC;

const Frame: FrameComponent = () => {
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
	return <img ref={imgRef} src={"nameplate.png"} style={{ pointerEvents: 'none', width: `${size.width}px`, height: `${size.height}` }} />
}

export { Frame }
