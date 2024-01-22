import { musicalTags } from "../components/Lists";
export default function Page() {
	return (
		<div className="max-w-4xl">
			{musicalTags.map((tag) => (
				<div
					key={tag}
					className={`cursor-pointer inline-block rounded-xl px-6 py-3 text-sm mr-1 mb-1 font-semibold text-white bg-gray-700 m-1`}>
					{tag}
				</div>
			))}
		</div>
	);
}
