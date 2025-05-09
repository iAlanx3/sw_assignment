interface Props {
	latitude: number;
	longitude: number;
}

export const WeatherMap = ({ latitude, longitude }: Props) => {
	const defaultSGCoord: number[] = [1.3521, 103.8198];

	const mapSrc = `https://maps.google.com/maps?q=${
		latitude ?? defaultSGCoord[0]
	},${
		longitude ?? defaultSGCoord[1]
	}&t=&z=14&ie=UTF8&iwloc=B&output=embed&z=11`;

	return (
		<>
			<h3>Location Component</h3>
			<div>
				<p>Latitude: {latitude}</p>
				<p>Longitude: {longitude}</p>
			</div>
		</>
	);
};
