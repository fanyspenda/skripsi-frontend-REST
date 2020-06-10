import * as React from "react";
import { Button } from "semantic-ui-react";

export interface EditDeleteButtonProps {
	onEditClick: () => void;
	onDeleteClick: () => void;
	isDisabled?: boolean;
}

const EditDeleteButton: React.FunctionComponent<EditDeleteButtonProps> = ({
	onEditClick,
	onDeleteClick,
	isDisabled,
}) => {
	return (
		<div className="ui two buttons">
			<Button
				color="yellow"
				basic
				onClick={() => onEditClick()}
				disabled={isDisabled || false}
			>
				Edit
			</Button>
			<Button
				color="red"
				basic
				onClick={() => onDeleteClick()}
				disabled={isDisabled || false}
			>
				Delete
			</Button>
		</div>
	);
};

export default EditDeleteButton;
