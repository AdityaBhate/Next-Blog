import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";

const getData = async (page, cat) => {
	const res = await fetch(
		`${process.env.PROD_URL}/api/posts?page=${page}&cat=${cat || ""}`,
		{
			cache: "no-store",
		}
	);

	if (!res.ok) {
		throw new Error("Failed");
	}

	return res.json();
};

const CardList = async ({ page, cat }) => {
	const { posts, count } = await getData(page, cat);

	const POST_PER_PAGE = 2;

	const hasPrev = POST_PER_PAGE * (page - 1) > 0;
	const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
	const sortPosts = (posts) => {
		posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

		return posts;
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Discover Posts</h1>
			<div className={styles.posts}>
				{sortPosts(posts)?.map((item) => (
					<Card item={item} key={item._id} />
				))}
			</div>
			<Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
		</div>
	);
};

export default CardList;
