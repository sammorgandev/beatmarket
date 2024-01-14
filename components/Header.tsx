"use client";
import MobileMenu from "@/components/MobileMenu";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/actions/Auth";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
const navigation = [
	{ name: "Home", href: "#" },
	{ name: "Genres", href: "#" },
	{ name: "Free", href: "#" },
	{ name: "Exclusive", href: "#" },
];

export default function Page() {
	const [scroll, setScroll] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const supabase = createClient();
	useEffect(() => {
		const updateUser = async () => {
			const returnedUser = await getCurrentUser();
			setUser(returnedUser);
		};
		updateUser();
	}, []);
	useEffect(() => {
		const changeBackground = () => {
			if (typeof window !== "undefined" && window.scrollY >= 1) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("scroll", changeBackground);
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("scroll", changeBackground);
			}
		};
	}, []);

	return (
		<>
			<header
				className={
					scroll
						? "bg-gray-950 transition-all duration-500"
						: "bg-gray-900 transition-all duration-200"
				}>
				<nav
					className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
					aria-label="Global">
					<div className="flex lg:flex-1 text-indigo-400">
						<a href="/" className="-m-1.5 p-1.5 flex gap-2 items-center">
							<AdjustmentsVerticalIcon width={30} height={30} />
							<h1 className="text-indigo-400 text-2xl">beatmarket</h1>
						</a>
					</div>
					<MobileMenu />
					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-sm font-semibold leading-6 text-white">
								{item.name}
							</a>
						))}
					</div>

					<div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
						<a
							href={user ? "/profile" : "/start"}
							className="text-sm font-semibold leading-6 text-white">
							{user ? user.email : "Upload a beat"}{" "}
							<span aria-hidden="true"> &nbsp; &rarr;</span>
						</a>
					</div>
				</nav>
			</header>
		</>
	);
}
