"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
	const [open, setOpen] = useState(false);

	const { data, status } = useSession();

	return (
		<>
			{status === "unauthenticated" ? (
				<Link href='/login' className={styles.link}>
					Login
				</Link>
			) : (
				<>
					<Link href='/write' className={styles.link}>
						Write
					</Link>
					<Link href='/profile'>
						<Image
							src={data?.user.image}
							alt='user'
							className={styles.userImage}
							width={24}
							height={24}
						/>
					</Link>
				</>
			)}
			<div className={styles.burger} onClick={() => setOpen(!open)}>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
			</div>
			{open && (
				<div className={styles.responsiveMenu}>
					<Link onClick={() => setOpen(false)} href='/'>
						Homepage
					</Link>
					<Link onClick={() => setOpen(false)} href='/about'>
						About
					</Link>
					<Link onClick={() => setOpen(false)} href='/blog'>
						Explore
					</Link>
					<Link onClick={() => setOpen(false)} href='/profile'>
						Profile
					</Link>
					{status === "notauthenticated" ? (
						<Link onClick={() => setOpen(false)} href='/login'>
							Login
						</Link>
					) : (
						<>
							<Link onClick={() => setOpen(false)} href='/write'>
								Write
							</Link>
							<span className={styles.link}>Logout</span>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default AuthLinks;
