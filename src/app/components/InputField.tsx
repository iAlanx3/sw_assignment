"use client";
import { useEffect, useState } from "react";

type Keyword = {
	n: number;
};
function isAlphabet(char: string): boolean {
	return /^[a-zA-Z]$/.test(char);
}
function isNumeric(char: string): boolean {
	return /^\d$/.test(char);
}

interface hintBox {
	_valid?: boolean;
	_category?: string;
	_issue?: string[];
}

export default function InputField() {
	const [input, setInput] = useState("");
	const [submittedInput, setSubmittedInput] = useState("");

	useEffect(() => {
		if (input.length >= 9 && input.length <= 10) {
			let hint: hintBox = { _issue: [] };
			let alphabet: number = 0;
			let digit: number = 0;

			switch (input.length) {
				case 9:
					hint._category = "A";
					for (let i = 0; i < 8; i++) {
						if (isNumeric(input.charAt(i))) {
							digit++;
						}
					}
					if (isAlphabet(input.charAt(8))) alphabet++;

					if (digit == 8 && alphabet == 1) {
						hint._valid = true;
					} else {
						hint._valid = false;
						if (alphabet == 0) hint._issue?.push("No check alphabet");
						if (digit !== 8)
							hint._issue?.push("First 8 characters are not purely digits");
					}
					break;
				case 10:
					//TODO: Check if 4th and 5th character belongs to the PQ entities
					//If yes,
					for (let i = 0; i < 3; i++) {
						if (isNumeric(input.charAt(i))) digit++;
					}
					if (digit !== 3) {
						hint._category = "B|C";
						hint._valid = false;
						hint._issue?.push("First three char should be digit");
						break;
					}

					break;
			}
		}
	}, [input]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent page reload
		setSubmittedInput(input); // Set state on Enter
	};

	return (
		<form className="flex flex-row gap-x-4" onSubmit={handleSubmit}>
			<div>Enter the UEN:</div>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				name="query"
				className="border-b-2 pl-1 pr-1"
			/>
			<p>Submitted: {submittedInput}</p>
		</form>
	);
}
