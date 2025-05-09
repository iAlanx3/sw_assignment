"use client";
import { useEffect, useState } from "react";
import { WeatherForm } from "./components/WeatherForm";
import { WeatherMap } from "./components/WeatherMap";
import { getIconByForecast } from "./components/sharedIcons";
import { JSX } from "@emotion/react/jsx-runtime";

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
	const [locations, setLocations] = useState<string[]>([]);
	const [selectedArea, setSelectedArea] = useState<string>("");
	const [forecast, setForecast] = useState<string>("");
	const [timeDate, setTimeDate] = useState<string[]>([]);
	const [geolocation, setGeolocation] = useState<number[]>([1.3521, 103.8198]);
	const [weather_icon, setWeather_Icon] = useState<JSX.Element>();

	useEffect(() => {
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
		fetchData(); //Run when page first load
		//Refresh data every 10 minutes
		const interval = setInterval(fetchData, 10 * 60 * 1000);
		//Clean up interval when done to prevent it from continuing in the background and causing issue
		return () => clearInterval(interval);
	}, []);

	function mapOutAreaName(data: AreaMetadata[] | undefined): string[] {
		if (!data || !Array.isArray(data)) {
			return [];
		}

		return data.map((area: AreaMetadata) => area.name);
	}

	function getForecastByArea(areaName: string): string {
		if (!weatherData) {
			return "";
		}

		const forecastItem = weatherData.items.find((item) =>
			item.forecasts.some((forecast) => forecast.area === areaName)
		);

		// If forecast for the area is found, return the forecast
		if (forecastItem) {
			const areaForecast = forecastItem.forecasts.find(
				(forecast) => forecast.area === areaName
			);
			return areaForecast ? areaForecast.forecast : "";
		}

		return "";
	}

	function getValidTime(): string[] {
		if (!weatherData) {
			return [];
		}

		const item = weatherData.items[0];
		//Valid from, Valid until, data last updated at
		return [
			`${item.valid_period.start}`,
			`${item.valid_period.end}`,
			`${item.update_timestamp}`
		];
	}

	function getLongLatfromName(areaName: string): number[] {
		if (!weatherData || !weatherData.area_metadata) return [];

		const item: AreaMetadata | undefined = weatherData.area_metadata.find(
			(item) => item.name === areaName
		);

		if (!item) return [];

		const { latitude, longitude } = item.label_location;
		return [latitude, longitude];
	}

	function updateLocation(_location: string): void {
		setSelectedArea(_location);
		setForecast(getForecastByArea(_location));
		setTimeDate(getValidTime());
		setGeolocation(getLongLatfromName(_location));
		setWeather_Icon(getIconByForecast(forecast));
	}

	return (
		<div className="flex flex-col bg-gray-100 sm:flex-row gap-y-4 sm:gap-x-4 min-h-screen items-stretch justify-center pt-20 px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
			<div className="flex-1 aspect-[1/1] border border-black p-4">
				<WeatherForm
					mapName={locations}
					updateLocation={updateLocation}
					forecast={forecast}
					icon={weather_icon}
					timeDate={timeDate}
				/>
			</div>
			<div className="flex-1 aspect-[1/1] border border-black p-4">
				<WeatherMap
					latitude={geolocation[0]}
					longitude={geolocation[1]}
					weather={forecast}
					icon={weather_icon}
				/>
			</div>
		</div>
	);
}
