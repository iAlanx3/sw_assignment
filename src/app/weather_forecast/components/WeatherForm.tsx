import { JSX } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "next/link";

interface Props {
	mapName: string[];
	forecast: string;
	timeDate: string[];
	icon?: JSX.Element;
	updateLocation: (location: string) => void;
}

export const WeatherForm = ({
	mapName,
	forecast,
	timeDate,
	icon,
	updateLocation
}: Props) => {
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

	return (
		<div className="flex flex-col gap-y-4 mx-auto h-full">
			<Autocomplete
				disablePortal
				options={mapName}
				onChange={(event: any, newValue: string | null) => {
					updateLocation(newValue ?? "");
				}}
				sx={{ width: "100%" }}
				renderInput={(params) => <TextField {...params} label="Location" />}
			/>
			{forecast === "" || timeDate.length === 0 ? (
				<></>
			) : (
				<div className="flex flex-col w-full h-full justify-between">
					<h1 className="font-bold mx-auto">2-Hour Weather Forecast</h1>
					<p>From: {timeStampToReadable(timeDate[0])}</p>
					<p>To: {timeStampToReadable(timeDate[1])}</p>
					<p className="mx-auto pt-4 font-semibold">{forecast}</p>
					<div className="mx-auto w-1/2 h-1/2 flex items-center justify-center">
						{icon &&
							React.cloneElement(icon, {
								fontSize: "inherit",
								style: { width: "50%", height: "50%" }
							})}
					</div>
					<footer className="text-sm text-center pb-2">
						<div className="flex flex-row gap-x-1 items-center justify-center">
							<p>Weather data pulled from: </p>
							<Link
								className=" text-blue-400"
								href="https://data.gov.sg/datasets/d_3f9e064e25005b0e42969944ccaf2e7a/view">
								data.gov.sg
							</Link>
						</div>
						<p>Data last updated at: {timeStampToReadable(timeDate[2])}</p>
					</footer>
				</div>
			)}
		</div>
	);
};
