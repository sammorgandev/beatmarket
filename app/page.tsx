"use client";
import { useEffect, type FC, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
type Beat = {
	id: number;
	name: string;
	description: string;
	file_path: string;
	categories: Array<string>;
	price: number;
	statusColor: string;
};
const statuses = {
	offline: "text-gray-500 bg-gray-100/10",
	online: "text-green-400 bg-green-400/10",
	error: "text-rose-400 bg-rose-400/10",
};
const environments: { [key: string]: string } = {
	Preview: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
	Production: "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
};

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
export default function Page() {
	const supabase = createClient();
	const [beats, setBeats] = useState<Beat[] | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			const { data: Beat, error } = await supabase.from("Beat").select("*");
			setBeats(Beat);
		};
		fetchData();
	}, []);
	if (!beats) return <div>loading...</div>;
	console.log(beats);
	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-full"></div>
			<div className="bg-slate-900 h-full flex flex-col gap-4 justify-center justify-self-center max-w-xl">
				<h1 className="text-4xl font-bold text-white">Browse beats</h1>
				<ul role="list" className="divide-y divide-white/5">
					{beats &&
						beats.map((beat) => (
							<Link href={`/beats/${beat.id}`}>
								<li
									key={beat.id}
									className="relative flex items-center space-x-4 py-4">
									<div className="min-w-0 flex-auto">
										<div className="flex items-center gap-x-3">
											<div className="text-green-400 bg-green-400/10 flex-none rounded-full p-1">
												<div className="h-2 w-2 rounded-full bg-current" />
											</div>
											<h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
												<span className="truncate">{beat.name}</span>{" "}
											</h2>

											<span className="text-gray-400">/</span>
											{beat.categories &&
												beat.categories.map((category) => (
													<Link
														href={`/genres/${category}`}
														key={category}
														className="text-gray-300 hover:text-indigo-400">
														{category}
													</Link>
												))}
										</div>
										<div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
											<p className="truncate">{beat.description}</p>
											<svg
												viewBox="0 0 2 2"
												className="h-0.5 w-0.5 flex-none fill-gray-300">
												<circle cx={1} cy={1} r={1} />
											</svg>
											<p className="whitespace-nowrap">
												{beat.categories && beat.categories.toString()}
											</p>
										</div>
									</div>
									<div className="text-indigo-400 bg-indigo-400/10 ring-indigo-400/30 rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset">
										{beat.price}
									</div>
									<ChevronRightIcon
										className="h-5 w-5 flex-none text-gray-400"
										aria-hidden="true"
									/>
								</li>
							</Link>
						))}
				</ul>
			</div>
		</div>
	);
}
