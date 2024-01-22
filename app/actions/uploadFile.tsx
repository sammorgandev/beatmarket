"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import path from "path";
// Create Supabase client

// Upload file using standard upload
export default async function uploadFile(
	selectedCategories: Array<string>,
	formData: FormData
) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const rawFormData = {
		file: formData.get("file-upload") as File,
		path: formData.get("filename") as string,
		name: formData.get("filename") as string,
		description: formData.get("about") as string,
		categories: selectedCategories,
	};
	const file = rawFormData.file;
	if (file && path) {
		const { data, error } = await supabase.storage
			.from("Audio uploads")
			.upload(rawFormData.path, file);
		if (error) {
			return console.log(error.message);
		} else {
			const { data, error } = await supabase
				.from("Beat")
				.insert([
					{
						name: rawFormData.name,
						description: rawFormData.description,
						file_path: rawFormData.path,
						categories: rawFormData.categories,
					},
				])
				.select();
			if (error) {
				return console.log(error.message);
			} else {
				return console.log(data);
			}
		}
	}
}
