"use client";

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
		<div className="flex flex-row gap-x-4 min-h-screen items-center justify-center px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
			{navItems.map((item, index) => (
				<Link key={index} href={item.href}>
					<div>{item.name}</div>
				</Link>
			))}
		</div>
	);
}
