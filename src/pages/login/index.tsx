import React, { useContext } from "react";
import { Segment, Card, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import CustomInputForm from "components/CustomInputForm";
import LoginSchema from "./loginValidation";
import axios from "axios";
import { TokenContext } from "contexts/tokenContext";
import { useHistory } from "react-router";

const Login: React.FunctionComponent = () => {
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
			axios
				.post("http://localhost:4000/user/login", values)
				.then((res) => {
					alert("login berhasil!");
					dispatch({ type: "SAVE_TOKEN", token: res.data.token });
					history.push("/listAlumni");
					// dispatch({ type: "REMOVE_TOKEN", token: "" });
				})
				.catch((err) => {
					alert(`gagal login: ${err.response.data.error}`);
				});
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<Card centered>
				<Segment basic>
					<h1>LOGIN</h1>
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
				<Button type="submit" color="blue" fluid size="huge">
					MASUK
				</Button>
			</Card>
		</form>
	);
};

export default Login;
