import { Map, Marker, ZoomControl } from "pigeon-maps";
import { JSX } from "react";

interface Props {
	latitude: number;
	longitude: number;
	weather: string;
	icon?: JSX.Element;
}

export const WeatherMap = ({ latitude, longitude, weather, icon }: Props) => {
	const defaultSGCoord: [number, number] = [1.3521, 103.8198];

	function getCoordinates(): [number, number] {
		return [latitude ?? defaultSGCoord[0], longitude ?? defaultSGCoord[1]];
	}

	return (
		<div className="flex items-center justify-center w-full  h-full">
			<Map defaultCenter={defaultSGCoord} defaultZoom={10}>
				<ZoomControl />
				{weather && (
					<Marker anchor={getCoordinates()}>
						<div style={{ fontSize: "24px" }}>{icon}</div>
					</Marker>
				)}
			</Map>
		</div>
	);
};
