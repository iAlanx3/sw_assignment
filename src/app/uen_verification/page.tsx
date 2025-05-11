"use client";
import { InputField } from "./components/InputField";
import { HintCard } from "./components/HintCard";
import { useState } from "react";

interface hintBox {
	_valid: boolean;
	_category: string;
	_issue: string;
}

export default function UENVerification_Page() {
	const [hint, setHint] = useState<hintBox[]>([]);
	return (
		<div className="flex flex-col bg-gray-100 min-h-[101vh] items-center justify-start px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
			<div className="flex flex-col gap-8 items-center w-full max-w-md mt-[33vh]">
				<h1 className="mx-auto font-bold text-2xl text-center">
					UEN Validator
				</h1>
				<InputField setHint={setHint} />
			</div>
			<div className="flex flex-col items-center w-full mt-5 gap-y-4 px-4">
				{hint.map((h, index) => (
					<HintCard
						key={index}
						_issue={h._issue}
						_category={h._category}
						_valid={h._valid}
					/>
				))}
			</div>
		</div>
	);
}
