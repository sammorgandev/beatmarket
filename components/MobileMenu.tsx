"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
const navigation = [
	{ name: "Home", href: "#" },
	{ name: "Genres", href: "#" },
	{ name: "Free", href: "#" },
	{ name: "Exclusive", href: "#" },
];
export default function Page() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<>
			<div className="flex lg:hidden">
				<button
					type="button"
					className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
					onClick={() => setMobileMenuOpen(true)}>
					<span className="sr-only">Open main menu</span>
					<Bars3Icon className="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
			;{/* Mobile Menu */}
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
								alt=""
							/>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-400"
							onClick={() => setMobileMenuOpen(false)}>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/25">
							<div className="space-y-2 py-6">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800">
										{item.name}
									</a>
								))}
							</div>
							<div className="py-6">
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
									Upload a beat{" "}
								</a>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</>
	);
}
