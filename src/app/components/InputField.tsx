import { Dispatch, SetStateAction, useState } from "react";
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
	_valid: boolean;
	_category: string;
	_issue: string;
}

interface Props {
	setHint: Dispatch<SetStateAction<hintBox[]>>;
}

export const InputField = ({ setHint }: Props) => {
	const [input, setInput] = useState("");
	const hint: hintBox[] = [];

	/**
	 * @param ch the T of Tyy in the UEN
	 * @returns the corresponding value, or initial 2 digits of the year
	 */
	function tToNumber(ch: string): number {
		return 20 - ("T".charCodeAt(0) - ch.toUpperCase().charCodeAt(0));
	}

	function hintBoxSetter(val: boolean, cat: string, iss: string): hintBox {
		const new_hint: hintBox = {
			_valid: val,
			_category: cat,
			_issue: iss
		};
		return new_hint;
	}

	function processInput(_userinput: string): void {
		//const hint: hintBox = { _issue: [] };
		//Format only has 9 or 10 characters
		if (_userinput.length < 9 || _userinput.length > 10) {
			hint.push(
				hintBoxSetter(false, "Unknown", "UEN should be 9-10 characters long.")
			);
			setHint(hint);
			return;
		} else {
			let flag: boolean = true;
			switch (_userinput.length) {
				case 9:
					hint.push(
						hintBoxSetter(
							true,
							"Businesses (ACRA)",
							"The string fulfills one of the criteria: 9-characters."
						)
					);
					/**
					 * Scenario one: Error in first 8 characters; there exist alphabet
					 */
					for (let i = 0; i < 8; i++) {
						if (isAlphabet(_userinput.charAt(i))) {
							flag = false;
							hint.push(
								hintBoxSetter(
									false,
									"Businesses (ACRA)",
									`There should be no alphabets in the first 8 characters: ${_userinput.substring(
										0,
										8
									)}`
								)
							);
							break;
						}
					}
					if (flag)
						hint.push(
							hintBoxSetter(
								true,
								"Businesses (ACRA)",
								`The first 8 characters: ${_userinput.substring(
									0,
									8
								)}, are all digits.`
							)
						);
					/**
					 * Scenario two: All correct - first 8 are digit and last char is alphabet
					 * Scenario three: Error in check alphabet; it is a digit instead
					 */
					let tempFlag: boolean = true;
					if (!isAlphabet(_userinput.charAt(8))) {
						flag = false;
						tempFlag = false;
					}
					hint.push(
						hintBoxSetter(
							tempFlag,
							"Businesses (ACRA)",
							tempFlag
								? `The last character: ${_userinput.charAt(
										8
								  )}, fulfills one of the criteria`
								: `The last character: ${_userinput.charAt(
										8
								  )}, should be an alphabet`
						)
					);

					hint.push(
						hintBoxSetter(
							flag,
							"Businesses (ACRA)",
							`The inputted string ${
								flag ? "complies" : "does not comply"
							} with the format of "Businesses (ACRA)"`
						)
					);
					break;
				default: //userinput.length === 10
					hint.push(
						hintBoxSetter(
							true,
							"Local Companies (ACRA)/All other entities",
							"The string fulfills one of the criteria: 10-characters."
						)
					);
					//Optional checking to ensure that year of issuance should be valid, aka <= now
					const currentYear: number = new Date().getFullYear();
					let year: number;
					//issue new UEN starts with alphabet
					if (isAlphabet(_userinput.charAt(0))) {
						year = tToNumber(_userinput.charAt(0)) * 100;
						if (
							isNumeric(_userinput.charAt(1)) &&
							isNumeric(_userinput.charAt(1))
						) {
							year +=
								parseInt(_userinput.charAt(1)) * 10 +
								parseInt(_userinput.charAt(2));
							if (year > currentYear) {
								console.log("year: " + year);
								console.log("currentYear: " + currentYear);
								//Check for valid year
								flag = false;
								hint.push(
									hintBoxSetter(
										false,
										"All other entities",
										`The year of issuance: ${year}, cannot be in the future.`
									)
								);
							} else {
								hint.push(
									hintBoxSetter(
										true,
										"All other entities",
										`The first three characters fulfills one of the criteria: Tyy`
									)
								);
							}
						} else {
							flag = false;
							hint.push(
								hintBoxSetter(
									false,
									"All other entities",
									"The second and third character should be numerical."
								)
							);
						}
						//Check if entity-type indicator is valid
						let tempFlag: boolean = true;
						if (!pqMap.has(_userinput.substring(3, 5))) {
							flag = false;
							tempFlag = false;
						}
						hint.push(
							hintBoxSetter(
								tempFlag,
								"All other entities",
								`The entity-type indicator: ${_userinput.substring(3, 5)}, is${
									tempFlag ? "" : " not"
								} within the recognised list.`
							)
						);
						//Check if 6th to 9th character are valid
						tempFlag = true;
						for (let i = 5; i < 9; i++) {
							if (isAlphabet(_userinput.charAt(i))) {
								tempFlag = false;
								flag = false;
								break;
							}
						}
						hint.push(
							hintBoxSetter(
								tempFlag ? true : false,
								"All other entities",
								`There should only be digits from the 6th to 9th character: ${_userinput.substring(
									5,
									9
								)}.`
							)
						);

						//Check for Check alphabet
						tempFlag = true;
						if (!isAlphabet(_userinput.charAt(9))) {
							tempFlag = false;
							flag = false;
						}
						hint.push(
							hintBoxSetter(
								tempFlag,
								"All other entities",
								tempFlag
									? `The last character: ${_userinput.charAt(
											9
									  )}, fulfills one of the criteria`
									: `The last character: ${_userinput.charAt(
											9
									  )}, should be an alphabet`
							)
						);

						hint.push(
							hintBoxSetter(
								flag,
								"All other entities",
								`The inputted string ${
									flag ? "complies" : " does not comply"
								} with the format of "All other entities"`
							)
						);
					} else {
						//first character is digit
						//local companies starts with four digit
						//Check 2nd to 4th characters
						for (let i = 1; i < 4; i++) {
							if (isAlphabet(_userinput.charAt(i))) {
								flag = false;
								hint.push(
									hintBoxSetter(
										false,
										"Local Companies (ACRA)",
										"There should only be digits for the first four characters."
									)
								);
								break;
							}
						}
						//Check for validity of year of issuance
						let tempFlag: boolean = true;
						year = parseInt(_userinput.substring(0, 4), 10);
						if (year > currentYear) {
							tempFlag = false;
						}
						hint.push(
							hintBoxSetter(
								tempFlag,
								"Local Companies (ACRA)",
								tempFlag
									? `The year of issuance: ${year}, fulfills one of the criteria`
									: `The year of issuance: ${year}, cannot be in the future.`
							)
						);

						//check 5th to 9th character
						tempFlag = true;
						for (let i = 4; i < 9; i++) {
							if (isAlphabet(_userinput.charAt(i))) {
								tempFlag = false;
							}
						}
						hint.push(
							hintBoxSetter(
								tempFlag,
								"Local Companies (ACRA)",
								tempFlag
									? `The 5th to 9th character: ${_userinput.substring(
											4,
											9
									  )}, fulfills one of the criteria.`
									: `There should only be digits from the 5th to 9th character: ${_userinput.substring(
											4,
											9
									  )}.`
							)
						);

						tempFlag = true;
						//Check if last character is check alphabet
						if (!isAlphabet(_userinput.charAt(9))) {
							flag = false;
							tempFlag = false;
						}
						hint.push(
							hintBoxSetter(
								tempFlag,
								"Local Companies (ACRA)",
								tempFlag
									? `The last character: ${_userinput.charAt(
											9
									  )}, fulfills one of the criteria`
									: `The last character: ${_userinput.charAt(
											9
									  )}, should be an alphabet`
							)
						);

						hint.push(
							hintBoxSetter(
								flag,
								"Local Companies (ACRA)",
								`The inputted string ${
									flag ? "complies" : "does not"
								} with the format of "Local Companies (ACRA)"`
							)
						);
					}
					break;
			}
		}
		setHint(hint);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent page reload
		processInput(input);
		//setSubmittedInput(input); // Set state on Enter
	};

	return (
		<form className="flex flex-row gap-x-4 mx-auto" onSubmit={handleSubmit}>
			<div>Enter the UEN:</div>
			<input
				type="text"
				placeholder="Enter the UEN here"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				name="query"
				className="border-b-2 pl-1 pr-1"
			/>
		</form>
	);
};
