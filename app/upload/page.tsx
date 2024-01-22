"use client";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import uploadFile from "../actions/uploadFile";
import { musicalTags } from "../components/Lists";
export default function Page({ categories }: { categories: Array<string> }) {
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const uploadBeat = uploadFile.bind(null, selectedGenres);
	const toggleGenre = (genre: string) => {
		setSelectedGenres((prevSelectedGenres) => {
			if (prevSelectedGenres.includes(genre)) {
				return prevSelectedGenres.filter((g) => g !== genre);
			} else {
				return [...prevSelectedGenres, genre];
			}
		});
	};
	const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
	const [filename, setFilename] = useState("");
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: (acceptedFiles) => {
			setUploadedFile(acceptedFiles[0]);
			const file = acceptedFiles[0];
			if (file) {
				const safeFilename = file.name.replace(/[\s.]+/g, "-").toLowerCase();
				setFilename(safeFilename);
			}

			console.log(acceptedFiles);
		},
	});

	return (
		<div className="w-9/12 mt-6 mb-6">
			<form action={uploadBeat}>
				<h1 className="text-4xl font-bold text-white">Upload a beat</h1>

				<div className="flex gap-10">
					<div className="mt-6 w-1/2 flex flex-col gap-6 ">
						<div
							{...getRootProps()}
							className="mt-2 cursor-pointer flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
							<input
								{...getInputProps()}
								id="file-upload"
								name="file-upload"
								type="file"
								className="sr-only"
							/>
							<div className="text-center">
								<SpeakerWaveIcon
									className={`mx-auto h-12 w-12 ${
										uploadedFile && "text-indigo-400"
									}  ${!uploadedFile && "text-gray-500"}`}
									aria-hidden="true"
								/>

								{!uploadedFile && (
									<>
										<div className="mt-4 flex text-sm leading-6 text-gray-400">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500">
												<span>Upload a file</span>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className="text-xs leading-5 text-gray-400">
											PNG, JPG, GIF up to 10MB
										</p>
									</>
								)}
								{uploadedFile && (
									<>
										<div className="mt-4 flex text-sm leading-6 text-indigo-400">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500">
												<span>{uploadedFile.name}</span>
											</label>
										</div>
										<p className="text-xs leading-5 text-gray-400">
											{uploadedFile.type}{" "}
										</p>
									</>
								)}
							</div>
						</div>
						<div className="w-full">
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
										value={filename}
										onChange={(e) => setFilename(e.target.value)}
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
						</div>
					</div>
					<div className="-mt-2 mb-10 gap-x-6 gap-y-8 w-1/2 ">
						<div className="col-span-full">
							<label
								htmlFor="about"
								className="block text-sm font-medium leading-6 text-white">
								Tags
							</label>
							<div className="mt-2">
								{musicalTags.map((tag) => (
									<div
										key={tag}
										onClick={() => toggleGenre(tag)}
										className={`cursor-pointer inline-block rounded-xl px-6 py-3 text-sm mr-1 mb-1 font-semibold text-white ${
											selectedGenres.includes(tag)
												? "bg-indigo-600"
												: "bg-gray-700"
										} m-1`}>
										{tag}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="cursor-pointer w-full bg-indigo-600 inline-block rounded-xl px-6 py-3 text-sm mr-1 mb-1 font-semibold text-white">
					Upload this beat
				</button>
			</form>
		</div>
	);
}
