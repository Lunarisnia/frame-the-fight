import { type FC, type ReactNode } from "react";
import styles from "./FancyText.module.css";

type FancyTextComponent = FC<{ children: ReactNode, color: string, font: string }>;

const FancyText: FancyTextComponent = ({ children, color, font }) => {
	return (
		<>
			<div className={`${styles.fancyText}`} style={{ color, fontFamily: font }} >
				<h1>{children}</h1>
			</div>
		</>
	)
}

export { FancyText };
