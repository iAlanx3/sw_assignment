import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
	className?: string;
	_valid?: boolean;
	_issue?: string[];
}

export const HintCard = ({ className, _valid, _issue }: Props) => {
	return (
		<div
			className={`flex flex-col max-w-96 overflow-hidden ${className} rounded-xl ${
				_valid ? "border-green-500" : "border-red-500"
			} ${_valid ? "bg-green-400" : "bg-red-400"}`}>
			<div className={`${_valid ? "bg-green-500" : "bg-red-500"}`}>
				{_valid ? (
					<DoneIcon className=" pl-1 pt-1 pb-1 " />
				) : (
					<CloseIcon className=" pl-1 pt-1 pb-1 " />
				)}
			</div>
			<div className="flex text-wrap pl-2 pr-2 pb-1">{_issue}</div>
		</div>
	);
};
