"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import styles from "./editorPage.module.css";
import Loader from "../loader/Loader";

const EditPage = () => {
	const { status } = useSession();
	const router = useRouter();
	const { slug } = useParams();
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState(null);
	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const [media, setMedia] = useState("");
	const [catSlug, setCatSlug] = useState("");

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			const res = await fetch(`/api/posts/${slug}`);
			const data = await res.json();
			setPost(data);
			setTitle(data.title);
			setValue(data.desc);
			setMedia(data.img);
			setCatSlug(data.catSlug);
			setLoading(false);
		};

		fetchPost();
	}, [slug]);

	if (status === "loading" || loading) {
		return <div className={styles.loading}>Loading...</div>;
	}

	if (status === "unauthenticated") {
		router.push("/");
	}

	const handleSubmit = async () => {
		setLoading(true);
		const res = await fetch(`/api/posts/${slug}`, {
			method: "PUT",
			body: JSON.stringify({
				title,
				desc: value,
				img: media,
				catSlug: catSlug || "coding",
			}),
		});

		if (res.status === 200) {
			setLoading(false);
			const data = await res.json();
			router.push(`/posts/${data.slug}`);
		}
	};

	return (
		<div className={styles.container}>
			<input
				type='text'
				placeholder='Title'
				className={styles.input}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<select
				className={styles.select}
				value={catSlug}
				onChange={(e) => setCatSlug(e.target.value)}>
				<option value='fashion'>fashion</option>
				<option value='food'>food</option>
				<option value='culture'>culture</option>
				<option value='travel'>travel</option>
				<option value='coding'>coding</option>
			</select>

			{media && (
				<div className={styles.media}>
					<Image
						className={styles.imagePreview}
						src={media}
						alt=''
						width={200}
						height={200}
					/>
				</div>
			)}

			<div className={styles.editor}>
				<ReactQuill
					className={styles.textArea}
					theme='bubble'
					value={value}
					onChange={setValue}
					placeholder='Tell your story...'
				/>
			</div>
			<button
				className={styles.publish}
				onClick={handleSubmit}
				disabled={loading}>
				Update
			</button>
		</div>
	);
};

export default EditPage;
