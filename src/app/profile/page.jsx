import Profile from "@/components/profile/Profile";

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
	() => import("../../components/profile/Profile"),
	{ ssr: false }
);

function page() {
	return (
		<>
			<DynamicComponentWithNoSSR />
		</>
	);
}

export default page;
