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
		<div className="flex flex-col bg-gray-100 min-h-screen items-center justify-center px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
			<main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 items-center z-10">
				<h1 className="mx-auto">UEN Validator</h1>
				<InputField setHint={setHint} />
			</main>
			<div className="flex flex-col w-full items-center mt-[60vh] gap-y-4">
				{hint.map((h, index) => (
					<HintCard
						className="hint-card w-full max-w-md"
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
