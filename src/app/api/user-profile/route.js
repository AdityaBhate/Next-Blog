import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
	const session = await getAuthSession();

	if (!session) {
		return new NextResponse(
			JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
		);
	}

	try {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			include: { Post: true, Comment: true },
		});

		return new NextResponse(JSON.stringify(user, { status: 200 }));
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({ message: error }, { status: 500 })
		);
	}
};
