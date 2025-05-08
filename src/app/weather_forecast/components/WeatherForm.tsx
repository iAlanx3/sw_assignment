import { useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface Props {
	mapName: string[];
}

export const WeatherForm = ({ mapName }: Props) => {
	const [input, setInput] = useState<string>("");

	return (
		<div className="flex flex-col gap-y-4 mx-auto">
			<Autocomplete
				disablePortal
				options={mapName}
				onChange={(event: any, newValue: string | null) => {
					setInput(newValue ?? "");
				}}
				sx={{ width: "100%" }}
				renderInput={(params) => <TextField {...params} label="Location" />}
			/>
		</div>
	);
};
