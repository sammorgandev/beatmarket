import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-slate-900 flex flex-col w-full min-h-screen text-foreground">
				<div className="flex-0 sticky top-0 z-20">
					<Header />
				</div>

				<div className="flex h-full flex-1 max-h-full flex-col justify-center items-center">
					<main className="flex flex-col justify-center items-center w-full">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
