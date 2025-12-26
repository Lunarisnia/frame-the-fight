import type { FC, ReactNode } from "react";
import styles from "./FancyText.module.css";

type FancyTextComponent = FC<{ children: ReactNode, color: string }>;

const FancyText: FancyTextComponent = ({ children, color }) => {
	return (
		<>
			<div className={`${styles.fancyText}`} style={{ color }} >
				<h1>{children}</h1>
			</div>
		</>
	)
}

export { FancyText };
