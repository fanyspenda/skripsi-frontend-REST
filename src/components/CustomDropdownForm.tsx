import React from "react";
import { Label, Dropdown, DropdownProps } from "semantic-ui-react";

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  onChange(event: React.SyntheticEvent<any>, data: DropdownProps): void;
  options: Array<{
    text: string;
    value: string;
  }>;
  touched: boolean | undefined;
  error: string | undefined;
}

const CustomDropdownForm: React.FunctionComponent<CustomDropdownProps> = props => {
  const { touched, error, label, ...rest } = props;
  return (
    <>
      <Label>{label}</Label>
      <Dropdown fluid selection search {...rest} />
      {touched && error && (
        <Label color="red" pointing="above">
          {error}
        </Label>
      )}
      <br />
    </>
  );
};

export default CustomDropdownForm;
