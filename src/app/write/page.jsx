import EditorPage from "@/components/editor/EditorPage";

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
	() => import("../../components/editor/EditorPage"),
	{ ssr: false }
);
// dynamic import to avoid server side rendering
function WritePage() {
	return (
		<>
			<DynamicComponentWithNoSSR />
		</>
	);
}

export default WritePage;
