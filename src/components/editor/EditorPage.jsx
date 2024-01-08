"use client";

import Image from "next/image";
import styles from "./editorPage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import ReactQuill from "react-quill";
import Loader from "../loader/Loader";

const EditorPage = () => {
	const { status } = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);
	const [media, setMedia] = useState("");
	const [value, setValue] = useState("");
	const [title, setTitle] = useState("");
	const [uploadProgress, setUploadProgress] = useState(0);
	const [catSlug, setCatSlug] = useState("");

	useEffect(() => {
		const storage = getStorage(app);
		const upload = () => {
			const name = new Date().getTime() + file.name;
			const storageRef = ref(storage, name);

			const uploadTask = uploadBytesResumable(storageRef, file);
			setLoading(true);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadProgress(progress);
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setMedia(downloadURL);
					});
				}
			);
			setOpen(false);
			setLoading(false);
		};

		file && upload();
	}, [file]);

	if (status === "loading") {
		return <div className={styles.loading}>Loading...</div>;
	}
	// if (loading) {
	// 	<Loader />;
	// }
	if (status === "unauthenticated") {
		router.push("/");
	}

	const slugify = (str) =>
		str
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "");

	const handleSubmit = async () => {
		setLoading(true);
		const res = await fetch("/api/posts", {
			method: "POST",
			body: JSON.stringify({
				title,
				desc: value,
				img: media,
				slug: slugify(title),
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
				onChange={(e) => setTitle(e.target.value)}
			/>
			<select
				className={styles.select}
				onChange={(e) => setCatSlug(e.target.value)}>
				<option value='fashion'>fashion</option>
				<option value='food'>food</option>
				<option value='culture'>culture</option>
				<option value='travel'>travel</option>
				<option value='coding'>coding</option>
			</select>

			{uploadProgress !== 0 && uploadProgress !== 100 && (
				<div
					className={styles.loading}
					style={{
						width: "100%",
						height: "20px",
						backgroundColor: "#f2f2f2",
						borderRadius: "4px",
						marginTop: "10px",
					}}>
					<div
						style={{
							width: `${uploadProgress.toFixed(0)}%`,
							height: "100%",
							backgroundColor: "#007bff",
							borderRadius: "4px",
							transition: "width 0.3s ease-in-out",
						}}></div>
				</div>
			)}

			<div className={styles.editor}>
				<button className={styles.button} onClick={() => setOpen(!open)}>
					<Image src='/plus.png' alt='' width={16} height={16} />
				</button>
				{open && (
					<div className={styles.add}>
						<input
							type='file'
							id='image'
							onChange={(e) => setFile(e.target.files[0])}
							style={{ display: "none" }}
						/>
						<button className={styles.addButton}>
							<label htmlFor='image'>
								<Image src='/image.png' alt='' width={16} height={16} />
							</label>
						</button>
						<button className={styles.addButton}>
							<Image src='/video.png' alt='' width={16} height={16} />
						</button>
					</div>
				)}
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
				Publish
			</button>
		</div>
	);
};

export default EditorPage;
