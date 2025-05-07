"use client";
import { useState } from "react";
import PQ from "../../entityTypeIndicator.json";

//Convert to hashmap for faster access
const pqMap: Map<string, string> = new Map<string, string>(Object.entries(PQ));

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

	/**
	 * @param ch the T of Tyy in the UEN
	 * @returns the corresponding value, or initial 2 digits of the year
	 */
	function tToNumber(ch: string): number {
		return 20 - ("T".charCodeAt(0) - ch.toUpperCase().charCodeAt(0));
	}

	function processInput(_userinput: string): void {
		const hint: hintBox = { _issue: [] };
		//Format only has 9 or 10 characters
		if (_userinput.length < 9 || _userinput.length > 10) {
			hint._category = "Unknown";
			hint._valid = false;
			//TODO: setState prop pass from card component
		} else {
			switch (_userinput.length) {
				case 9:
					for (let i = 0; i < 8; i++) {
						hint._category = "Businesses (ACRA)";
						/**
						 * Scenario one: Error in first 8 characters; there exist alphabet
						 */
						if (isAlphabet(_userinput.charAt(i))) {
							hint._valid = false;
							hint._issue?.push(
								"There should be no alphabets in the first 8 characters."
							);
						}
						/**
						 * Scenario two: All correct - first 8 are digit and last char is alphabet
						 * Scenario three: Error in check alphabet; it is a digit instead
						 */
						if (isAlphabet(_userinput.charAt(8)) && hint._valid !== false) {
							hint._valid = true;
							hint._issue?.push(
								'The inputted string complies with the format of "Businesses (ACRA)"'
							);
						} else if (!isAlphabet(_userinput.charAt(8))) {
							hint._valid = false;
							hint._issue?.push("The last character should be an alphabet");
						}
					}
					break;
				default: //userinput.length === 10
					//Optional checking to ensure that year of issuance should be valid, aka <= now
					const currentYear: number = new Date().getFullYear();
					let year: number;
					//issue new UEN starts with alphabet
					if (isAlphabet(_userinput.charAt(0))) {
						hint._category = "Local Companies (ACRA)";
						year = tToNumber(_userinput.charAt(0)) * 1000;
						if (
							isNumeric(_userinput.charAt(1)) &&
							isNumeric(_userinput.charAt(1))
						) {
							year +=
								parseInt(_userinput.charAt(1)) * 10 +
								parseInt(_userinput.charAt(2));
							if (year > currentYear) {
								//Check for valid year
								hint._valid = false;
								hint._issue?.push(
									"The year of issuance cannot be in the future."
								);
							}
						} else {
							hint._valid = false;
							hint._issue?.push(
								"The second and third character should be numerical."
							);
						}
						//Check if entity-type indicator is valid
						if (!pqMap.has(_userinput.substring(3, 5))) {
							hint._valid = false;
							hint._issue?.push(
								"The entity-type indicator is not within the recognised list."
							);
						}
						//Check if 6th to 9th character are valid
						for (let i = 5; i < 9; i++) {
							if (isAlphabet(_userinput.charAt(i))) {
								hint._valid = false;
								hint._issue?.push(
									"There should only be digits from the 6th to 9th character."
								);
								break;
							}
						}

						//Check for Check alphabet
						if (!isAlphabet(_userinput.charAt(9))) {
							hint._valid = false;
							hint._issue?.push("The last character should be an alphabet");
						}

						if (hint._valid !== false) {
							hint._valid = true;
							hint._issue?.push(
								'The inputted string complies with the format of "All other entities"'
							);
						}
					} else {
						//local companies starts with digit
						//Check 2nd to 4th characters
						for (let i = 1; i < 4; i++) {
							if (isAlphabet(_userinput.charAt(i))) {
								hint._valid = false;
								hint._issue?.push(
									"There should only be digits for the first four characters."
								);
								break;
							}
						}
						//Check for validity of year of issuance
						if (hint._valid !== false) {
							year = parseInt(_userinput.substring(0, 5), 10);
							if (year > currentYear) {
								hint._valid = false;
								hint._issue?.push(
									"The year of issuance cannot be in the future."
								);
							}
						}

						//check 5th to 9th character
						for (let i = 4; i < 9; i++) {
							if (isAlphabet(_userinput.charAt(i))) {
								hint._valid = false;
								hint._issue?.push(
									"There should only be digits from the 5th to 9th character."
								);
							}
						}

						//Check if last character is check alphabet
						if (!isAlphabet(_userinput.charAt(9))) {
							hint._valid = false;
							hint._issue?.push("The last character should be an alphabet");
						}

						if (hint._valid !== false) {
							hint._valid = true;
							hint._issue?.push(
								'The inputted string complies with the format of "Local Companies (ACRA)"'
							);
						}
					}
					break;
			}
		}
	}

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
