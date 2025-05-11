import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
	_valid: boolean;
	_category: string;
	_issue: string;
}

export const HintCard = ({ _valid, _category, _issue }: Props) => {
	return (
		<div
			className={`flex flex-col max-w-[400px] w-full overflow-hidden rounded-xl border-2 hint-card ${
				_valid ? "border-green-500 bg-green-400" : "border-red-500 bg-red-400"
			}`}>
			<div
				className={`flex flex-row gap-x-4 ${
					_valid ? "bg-green-500" : "bg-red-500"
				}`}>
				{_valid ? (
					<DoneIcon className=" pl-1 pt-1 pb-1 " />
				) : (
					<CloseIcon className=" pl-1 pt-1 pb-1 " />
				)}
				<p className=" fill-black text-black">{_category}</p>
			</div>
			<div className="w-full break-words whitespace-pre-wrap p-2 text-black">
				{_issue}
			</div>
		</div>
	);
};
