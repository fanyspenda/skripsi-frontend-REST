import * as React from "react";
import { Button } from "semantic-ui-react";

export interface EditDeleteButtonProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const EditDeleteButton: React.FunctionComponent<EditDeleteButtonProps> = ({
  onEditClick,
  onDeleteClick
}) => {
  return (
    <div className="ui two buttons">
      <Button color="yellow" basic onClick={() => onEditClick()}>
        Edit
      </Button>
      <Button color="red" basic onClick={() => onDeleteClick()}>
        Delete
      </Button>
    </div>
  );
};

export default EditDeleteButton;
