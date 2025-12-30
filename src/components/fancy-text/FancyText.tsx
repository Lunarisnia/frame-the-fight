import { type FC, type ReactNode } from "react";
import styles from "./FancyText.module.css";

type FancyTextComponent = FC<{ children: ReactNode, color: string, font: string, fontSize: number }>;

const FancyText: FancyTextComponent = ({ children, color, font, fontSize }) => {
	return (
		<>
			<div className={`${styles.fancyText}`} style={{ color, fontFamily: font, fontSize: `${fontSize}px` }} >
				<h1>{children}</h1>
			</div>
		</>
	)
}

export { FancyText };
