"use client";
import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "../card/Card";
import Loader from "../loader/Loader";

function Profile() {
	const { data, status } = useSession();
	const [posts, setPosts] = useState();
	const [profileInfo, setProfileInfo] = useState();
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const signoutUser = () => {
		signOut();
		router.push("/");
	};

	const getData = async () => {
		setLoading(true);
		const res = await fetch(`/api/user-profile`, {
			cache: "no-store",
		});

		if (!res.ok) {
			console.log(res);
			throw new Error("Failed");
		}
		const data = await res.json();
		setPosts(data.Post);
		setProfileInfo(data);
		setLoading(false);
	};
	useEffect(() => {
		getData();
	}, []);

	if (status === "unauthenticated") {
		router.push("/");
	}
	const deletePost = async (id) => {
		setLoading(true);
		const res = await fetch(`${process.env.PROD_URL}/api/posts/${id}`, {
			method: "DELETE",
		});
		if (!res.ok) {
			throw new Error("Failed");
		}
		setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
		setLoading(false);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div>
			<div className={styles.profileInfoContainer}>
				<div className={styles.profileImageContainer}>
					<Image
						src={data?.user?.image}
						alt='user image'
						className={styles.image}
						width={100}
						height={100}
					/>
					<button className={styles.button} onClick={() => signoutUser()}>
						Sign Out
					</button>
				</div>

				<div className={styles.profileNameAndEmail}>
					<p className={styles.name}>{profileInfo?.name}</p>
					<p className={styles.email}>{profileInfo?.email}</p>
					<div className={styles.statsContainer}>
						<p className={styles.stats}>
							Posts:{" "}
							<span className={styles.Statsspan}>
								{profileInfo?.Post.length}
							</span>
						</p>
						<p className={styles.stats}>
							Comments:{" "}
							<span className={styles.Statsspan}>
								{profileInfo?.Comment.length}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<h1 className={styles.title}>Your Posts</h1>
				<div className={styles.posts}>
					{posts?.map((item, index) => (
						<div className={styles.postContainer} key={index}>
							<Card item={item} key={item._id} />
							<button
								className={styles.Deletebutton}
								onClick={() => deletePost(item.id)}>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Profile;
