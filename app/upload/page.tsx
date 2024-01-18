import { PhotoIcon } from "@heroicons/react/24/outline";
export default function Page() {
	return (
		<div className=" w-4/12">
			<h1 className="text-4xl font-bold text-white">Upload a beat</h1>
			<div className="col-span-full">
				<div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
					<div className="text-center">
						<PhotoIcon
							className="mx-auto h-12 w-12 text-gray-500"
							aria-hidden="true"
						/>
						<div className="mt-4 flex text-sm leading-6 text-gray-400">
							<label
								htmlFor="file-upload"
								className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500">
								<span>Upload a file</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									className="sr-only"
								/>
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						<p className="text-xs leading-5 text-gray-400">
							PNG, JPG, GIF up to 10MB
						</p>
					</div>
				</div>
			</div>
			<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div className="sm:col-span-4">
					<label
						htmlFor="username"
						className="block text-sm font-medium leading-6 text-white">
						Filename
					</label>
					<div className="mt-2">
						<div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
							<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
								beatmarket.io/
							</span>
							<input
								type="text"
								name="filename"
								id="filename"
								className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="dope-hip-hop-beat"
							/>
						</div>
					</div>
				</div>

				<div className="col-span-full">
					<label
						htmlFor="about"
						className="block text-sm font-medium leading-6 text-white">
						Describe it
					</label>
					<div className="mt-2">
						<textarea
							id="about"
							name="about"
							rows={3}
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
							defaultValue={""}
						/>
					</div>
					<p className="mt-3 text-sm leading-6 text-gray-400">
						Write a few sentences about this beat.
					</p>
				</div>
			</div>
		</div>
	);
}
