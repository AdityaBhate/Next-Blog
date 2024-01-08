import React from "react";
import styles from "./about.module.css";
import Image from "next/image";

function About() {
	return (
		<div className={styles.post}>
			<div className={styles.imgContainer}>
				<Image src='/dog_call.png' alt='' fill className={styles.image} />
			</div>
			<div className={styles.textContainer}>
				<h1 className={styles.postTitle}>About Me</h1>
				<p className={styles.postDesc}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate,
					quam nisi magni ea laborum inventore voluptatum laudantium repellat
					ducimus unde aspernatur fuga. Quo, accusantium quisquam! Harum unde
					sit culpa debitis.
				</p>
			</div>
		</div>
	);
}

export default About;
