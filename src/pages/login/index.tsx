import React, { useContext } from "react";
import { Segment, Card, Button, Label } from "semantic-ui-react";
import { useFormik } from "formik";
import CustomInputForm from "components/CustomInputForm";
import LoginSchema from "./loginValidation";
import axios from "axios";
import { TokenContext } from "contexts/tokenContext";
import { useHistory } from "react-router";
import UseLoading from "hooks/useLoading";
import useError from "hooks/useError";
import { restUrl } from "serverUrl";

const Login: React.FunctionComponent = () => {
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();
	const { error, setError } = useError();
	const history = useHistory();
	const { dispatch } = useContext(TokenContext);
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			setLoadingToTrue();
			axios
				.post(`${restUrl}user/login`, values)
				.then((res) => {
					dispatch({ type: "SAVE_TOKEN", token: res.data.token });
					history.push("/alumni");
					// dispatch({ type: "REMOVE_TOKEN", token: "" });
				})
				.catch((err) => {
					setError(err.response.data.error);
				})
				.finally(() => {
					setLoadingToFalse();
				});
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<Card centered>
				<Segment basic>
					<h1>LOGIN</h1>
					{isLoading && (
						<Label color="green">mendapatkan token...</Label>
					)}
					{error && !isLoading && <Label color="red">{error}</Label>}
					<br />
					<CustomInputForm
						label="Email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.errors.email}
						touched={formik.touched.email}
					/>
					<CustomInputForm
						label="Password"
						name="password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.errors.password}
						touched={formik.touched.password}
					/>
				</Segment>
				<Button
					type="submit"
					color="blue"
					fluid
					size="huge"
					disabled={isLoading}
				>
					MASUK
				</Button>
			</Card>
		</form>
	);
};

export default Login;
