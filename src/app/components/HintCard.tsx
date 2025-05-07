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
			className={`flex flex-col overflow-hidden ${className} rounded-xl ${
				_valid ? "border-green-500" : "border-red-500"
			} ${_valid ? "bg-green-400" : "bg-red-400"}`}>
			<div
				className={`${_valid ? "bg-green-500" : "bg-red-500"} pl-2 pt-2 pb-2 `}>
				{_valid ? <DoneIcon /> : <CloseIcon />}
			</div>
			<div>{_issue}</div>
		</div>
	);
};
