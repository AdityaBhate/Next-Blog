import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
	const { slug } = params;
	console.log(slug);
	try {
		const post = await prisma.post.update({
			where: { slug },
			data: { views: { increment: 1 } },
			include: { user: true },
		});

		return new NextResponse(JSON.stringify(post, { status: 200 }));
	} catch (err) {
		console.log(err);
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
		);
	}
};

// DELETE POST
export const DELETE = async (req, { params }) => {
	const { slug } = params;
	console.log(slug);
	try {
		const post = await prisma.post.delete({ where: { id: slug } });

		return new NextResponse(JSON.stringify("Post deleted!", { status: 200 }));
	} catch (err) {
		console.log(err);
		return new NextResponse(
			// JSON.stringify({ message: err.message }, { status: 500 })
			JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
		);
	}
};
