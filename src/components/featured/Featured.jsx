import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Discover stories and creative ideas.</h1>
			<div className={styles.post}>
				<div className={styles.imgContainer}>
					<Image src='/coffee.png' alt='' fill className={styles.image} />
				</div>
				<div className={styles.textContainer}>
					<h1 className={styles.postTitle}>Welcome to Our Blog Platform</h1>
					<p className={styles.postDesc}>
						Discover a seamless blogging experience with our platform. Create,
						edit, and manage your posts effortlessly. Enjoy features like CRUD
						operations, user authentication, categorized content, and a rich
						text editor for a smooth writing journey.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Featured;
