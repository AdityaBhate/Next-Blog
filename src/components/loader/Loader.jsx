import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
	console.log("loader");
	return (
		<div className={styles.loader}>
			<div className={styles.loader__spinner}></div>
		</div>
	);
};

export default Loader;
