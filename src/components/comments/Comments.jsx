"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url) => {
	const res = await fetch(url);

	const data = await res.json();

	if (!res.ok) {
		const error = new Error(data.message);
		throw error;
	}

	return data;
};

const Comments = ({ postSlug }) => {
	const { status } = useSession();
	const { data, mutate, isLoading } = useSWR(
		`/api/comments?postSlug=${postSlug}`,
		fetcher
	);

	const [desc, setDesc] = useState("");

	const handleSubmit = async () => {
		await fetch(`/api/comments`, {
			method: "POST",
			body: JSON.stringify({ desc, postSlug }),
		});
		mutate();
		setDesc("");
	};
	const handleDelete = async (id) => {
		await fetch(`/api/comments`, {
			method: "DELETE",
			body: JSON.stringify({ id }),
		});
		mutate();
		setDesc("");
	};

	const sortComments = (comments, userEmail) => {
		comments.sort((a, b) => (a.userEmail === userEmail ? -1 : 1));
		comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

		return comments;
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Comments</h1>
			{status === "authenticated" ? (
				<div className={styles.write}>
					<textarea
						placeholder='write a comment...'
						className={styles.input}
						onChange={(e) => setDesc(e.target.value)}
					/>
					<button className={styles.button} onClick={handleSubmit}>
						Send
					</button>
				</div>
			) : (
				<Link href='/login'>Login to write a comment</Link>
			)}
			{isLoading ? (
				"loading..."
			) : (
				<Comment
					commentsData={sortComments(data, data.userEmail)}
					handleDelete={handleDelete}
				/>
			)}
		</div>
	);
};

export default Comments;

const Comment = ({ commentsData, handleDelete }) => {
	const { data, status } = useSession();
	return (
		<div className={styles.comments}>
			{commentsData?.map((item) => (
				<div className={styles.commentBox} key={item._id}>
					<div className={styles.comment}>
						<div className={styles.user}>
							{item?.user?.image && (
								<Image
									src={item.user.image}
									alt=''
									width={50}
									height={50}
									className={styles.image}
								/>
							)}
							<div className={styles.userInfo}>
								<span className={styles.username}>{item.user.name}</span>
								<span className={styles.date}>{item.createdAt}</span>
							</div>
						</div>
						<p className={styles.desc}>{item.desc}</p>
					</div>
					{data.user.email === item.user.email && (
						<button
							className={styles.deleteButton}
							onClick={() => handleDelete(item.id)}>
							Delete
						</button>
					)}
				</div>
			))}
		</div>
	);
};
