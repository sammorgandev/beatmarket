"use client";
import Link from "next/link";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import { signIn, signUp } from "../actions/Auth";
import { use, useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
export default function Login() {
	const [mode, setMode] = useState("sign-up");
	const supabase = createClient();
	useEffect(() => {
		const fetchData = async () => {
			const { data: user } = await supabase.auth.getUser();
			if (user.user) {
				window.location.href = "/profile";
			}
		};
		fetchData();
	}, []);
	return (
		<>
			<div className="flex w-full flex-1 h-fit flex-col justify-center items-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<center>
						<div className="text-indigo-400">
							{" "}
							<AdjustmentsVerticalIcon width={50} height={50} />
						</div>
					</center>

					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
						{mode === "sign-up"
							? "Sign up to upload beats"
							: "Sign in to upload beats"}
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						action={mode === "sign-in" ? signIn : signUp}
						method="POST">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-white">
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-white">
									Password
								</label>
								{mode === "sign-in" && (
									<div className="text-sm">
										<a
											href="#"
											className="font-semibold text-indigo-400 hover:text-indigo-300">
											Forgot password?
										</a>
									</div>
								)}
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
								{mode === "sign-up" ? "Sign up" : "Sign in"}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-400">
						{mode === "sign-up"
							? "Already have an account?"
							: "Need an account?"}
						{"   "}
						<button
							onClick={() =>
								setMode(mode === "sign-up" ? "sign-in" : "sign-up")
							}
							className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
							{mode === "sign-up" ? "Log in" : "Sign up"}
						</button>
					</p>
				</div>
			</div>
		</>
	);
}
