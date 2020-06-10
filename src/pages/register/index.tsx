import React from "react";
import { Segment, Card, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import CustomInputForm from "components/CustomInputForm";
import RegisterSchema from "./registerValidation";
import axios from "axios";
import { restUrl } from "serverUrl";
import UseLoading from "hooks/useLoading";
import { useHistory } from "react-router-dom";

const Register: React.FunctionComponent = () => {
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: RegisterSchema,
		onSubmit: (values) => {
			setLoadingToTrue();
			axios
				.post(`${restUrl}user/register`, values)
				.then((res) => {
					alert("register berhasil!");
					history.push("/login");
				})
				.catch((err) => {
					alert(`gagal membuat akun: ${err}`);
				})
				.finally(() => setLoadingToFalse());
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<Card centered>
				<Segment basic loading={isLoading}>
					<h1>REGISTER</h1>
					<CustomInputForm
						label="Name"
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
						error={formik.errors.name}
						touched={formik.touched.name}
					/>
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
					DAFTAR
				</Button>
			</Card>
		</form>
	);
};

export default Register;
