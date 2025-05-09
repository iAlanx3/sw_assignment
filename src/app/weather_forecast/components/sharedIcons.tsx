import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterIcon from "@mui/icons-material/Water";
import { JSX } from "react";

export const weatherIcon = [
	{
		names: ["Fair", "Fair (Day)", "Fair (Night)"],
		image: (
			<WbSunnyIcon
				sx={{
					color: "yellow",
					stroke: "black",
					strokeWidth: 1
				}}
			/>
		)
	},
	{
		names: [
			"Partly Cloudy",
			"Partly Cloudy (Day)",
			"Partly Cloudy (Night)",
			"Cloudy"
		],
		image: (
			<CloudIcon
				sx={{
					color: "white",
					stroke: "black",
					strokeWidth: 1
				}}
			/>
		)
	},
	{
		names: ["Hazy", "Slightly Hazy", "Mist", "Fog"],
		image: (
			<WaterIcon
				sx={{
					color: "gray",
					stroke: "black",
					strokeWidth: 1
				}}
			/>
		)
	},
	{
		names: ["Windy"],
		image: <AirIcon />
	},
	{
		names: [
			"Light Rain",
			"Moderate Rain",
			"Heavy Rain",
			"Passing Showers",
			"Light Showers",
			"Heavy Showers"
		],
		image: <WaterDropIcon />
	},
	{
		names: [
			"Thundery Showers",
			"Heavy Thundery Showers",
			"Heavy Thundery Showers with Gusty Winds"
		],
		image: <ThunderstormIcon />
	}
];

export function getIconByForecast(name: string): JSX.Element {
	const match = weatherIcon.find((item) => item.names.includes(name));
	return match?.image ?? weatherIcon[0].image;
}
