import { JSX, useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import WaterOutlinedIcon from "@mui/icons-material/WaterOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

interface Props {
	mapName: string[];
	forecast: string;
	timeDate: string[];
	updateLocation: (location: string) => void;
}

const weatherIcon = [
	{
		names: ["Fair", "Fair (Day)", "Fair (Night)"],
		image: <WbSunnyOutlinedIcon />
	},
	{
		names: [
			"Partly Cloudy",
			"Partly Cloudy (Day)",
			"Partly Cloudy (Night)",
			"Cloudy"
		],
		image: <CloudOutlinedIcon />
	},
	{
		names: ["Hazy", "Slightly Hazy", "Mist", "Fog"],
		image: <WaterOutlinedIcon />
	},
	{
		names: ["Windy"],
		image: <AirOutlinedIcon />
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
		image: <WaterDropOutlinedIcon />
	},
	{
		names: [
			"Thundery Showers",
			"Heavy Thundery Showers",
			"Heavy Thundery Showers with Gusty Winds"
		],
		image: <ThunderstormOutlinedIcon />
	}
];

export const WeatherForm = ({
	mapName,
	forecast,
	timeDate,
	updateLocation
}: Props) => {
	const [input, setInput] = useState<string>("");

	function timeStampToReadable(timeStamp: string): string {
		const [date, time] = timeStamp.split("T");
		const friendlyDate = formatDateString(date);
		const friendlyTime = formatTimeString(time);
		return `${friendlyDate}, ${friendlyTime}`;
	}

	function formatTimeString(timeString: string): string {
		const [hours, minutes] = timeString.split(":").map(Number);

		let formattedHour = hours % 12;
		if (formattedHour === 0) formattedHour = 12;

		const timefix = hours >= 12 ? "PM" : "AM";

		return `${formattedHour}.${minutes.toString().padStart(2, "0")} ${timefix}`;
	}

	function formatDateString(dateString: string): string {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "long" });
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	}

	function getIconByForecast(name: string) {
		const match = weatherIcon.find((item) => item.names.includes(name));
		return match?.image ?? null;
	}

	return (
		<div className="flex flex-col gap-y-4 mx-auto">
			<Autocomplete
				disablePortal
				options={mapName}
				onChange={(event: any, newValue: string | null) => {
					setInput(newValue ?? "");
					updateLocation(newValue ?? "");
				}}
				sx={{ width: "100%" }}
				renderInput={(params) => <TextField {...params} label="Location" />}
			/>
			{forecast === "" || timeDate.length === 0 ? (
				<></>
			) : (
				<div className="flex flex-col w-full">
					<h1 className="font-bold mx-auto">2-Hour Weather Forecast</h1>
					<p>From: {timeStampToReadable(timeDate[0])}</p>
					<p>To: {timeStampToReadable(timeDate[1])}</p>
					<p>Data last updated at: {timeStampToReadable(timeDate[2])}</p>
					<p className="mx-auto pt-4 font-semibold">{forecast}</p>
					<div className="mx-auto w-1/2 h-1/2 flex items-center justify-center">
						{React.cloneElement(getIconByForecast(forecast) as JSX.Element, {
							fontSize: "inherit",
							style: { width: "50%", height: "50%" }
						})}
					</div>
				</div>
			)}
		</div>
	);
};
