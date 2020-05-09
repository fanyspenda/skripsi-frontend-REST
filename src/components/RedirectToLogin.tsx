import React from "react";
import { TokenContext } from "contexts/tokenContext";
import { Redirect } from "react-router-dom";

export interface RedirectToLoginProps {}

const RedirectToLogin: React.SFC<RedirectToLoginProps> = () => {
	return (
		<TokenContext.Consumer>
			{(values) => {
				if (!values.token) {
					return <Redirect to="/login" />;
				}
			}}
		</TokenContext.Consumer>
	);
};

export default RedirectToLogin;
