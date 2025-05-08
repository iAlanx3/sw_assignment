"use client";
import { useEffect, useState } from "react";
import { WeatherForm } from "./components/WeatherForm";

interface WeatherData {
	code: number;
	errorMsg: string;
	area_metadata: AreaMetadata[];
	items: ForecastItem[];
}
interface AreaMetadata {
	name: string;
	label_location: {
		latitude: number;
		longitude: number;
	};
}
interface ForecastItem {
	update_timestamp: string;
	timestamp: string;
	valid_period: {
		start: string;
		end: string;
		text: string;
	};
	forecasts: Forecast[];
}
interface Forecast {
	area: string;
	forecast: string;
}

export default function WeatherForecast_Page() {
	const [weatherData, setweatherData] = useState<WeatherData | null>(null);
	const [location, setLocations] = useState<string[]>([]);
	//Fetch and reset data every minute
	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			const res = await fetch("../api/weather_forecast");

			if (!res.ok) {
				const text = await res.text();
				console.error("Error response text:", text);
				throw new Error(`Failed to fetch. Status: ${res.status}`);
			}

			const data = await res.json();
			setweatherData(data);
			const locations = mapOutAreaName(data.area_metadata);
			setLocations(locations);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	}

	function mapOutAreaName(data: AreaMetadata[] | undefined): string[] {
		if (!data || !Array.isArray(data)) {
			return [];
		}

		return data.map((area: AreaMetadata) => area.name);
	}
	return (
		<div className="flex flex-col lg:flex-row gap-x-4 min-h-screen items-stretch justify-center pt-20 px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
			<div className="flex-1 max-h-full border border-black p-4">
				<WeatherForm mapName={location} />
			</div>
			<div className="flex-1 border border-black p-4">TODO: Google Map</div>
		</div>
	);
}
