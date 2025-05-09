"use client";
import "./globals.css";

import Link from "next/link";

const navItems = [
	{
		name: "UEN Verification",
		href: "/uen_verification"
	},
	{
		name: "Weather Forecast",
		href: "/weather_forecast"
	}
];

export default function Home() {
	return (
		<div className="flex flex-col w-full gap-y-8 lg:flex-row lg:gap-x-8 min-h-screen items-center justify-center px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
			{navItems.map((item, index) => (
				<Link
					key={index}
					href={item.href}
					className="link-card flex items-center justify-center p-4 ">
					<p className="text-center font-bold text-2xl text-wrap">
						{item.name}
					</p>
				</Link>
			))}
		</div>
	);
}
