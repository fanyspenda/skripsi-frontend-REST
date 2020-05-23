import React from "react";
import { Segment, Button } from "semantic-ui-react";
import CustomInputForm from "components/CustomInputForm";
import { useFormik } from "formik";
import CustomDropdownForm from "components/CustomDropdownForm";
import AddUserValidationSchema from "./addUserValidationSchema";
import UseLoading from "hooks/useLoading";
import useAuth from "hooks/useAuth";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const role = [
	{
		text: "admin",
		value: 0,
	},
	{
		text: "user",
		value: 1,
	},
];

const AddUser: React.FunctionComponent = () => {
	const history = useHistory();
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();
	const { token, isLevelMatch, level } = useAuth();
	const formik = useFormik({
		initialValues: { name: "", level: 0, email: "", password: "" },
		validationSchema: AddUserValidationSchema,
		onSubmit: (values) => {
			setLoadingToTrue();
			Axios.post("http://localhost:4000/user/register", values, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
				.then(() => {
					history.push("/users");
				})
				.catch((err) => {
					alert(err.response.data);
				})
				.finally(() => setLoadingToFalse());
		},
	});
	return (
		<Segment basic disabled={isLoading}>
			{isLevelMatch(level, 0)}
			<h1>Tambah Pengguna</h1>
			<form onSubmit={formik.handleSubmit}>
				<CustomInputForm
					label="Nama"
					name="name"
					onChange={formik.handleChange}
					value={formik.values.name}
					error={formik.errors.name}
					touched={formik.touched.name}
				/>
				<CustomInputForm
					label="Email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					error={formik.errors.email}
					touched={formik.touched.email}
				/>
				<CustomInputForm
					label="Password"
					name="password"
					onChange={formik.handleChange}
					value={formik.values.password}
					error={formik.errors.password}
					touched={formik.touched.password}
					type="password"
				/>
				<CustomDropdownForm
					label="Role"
					value={formik.values.level}
					onChange={(event, data) =>
						formik.setFieldValue("level", data.value)
					}
					options={role}
					placeholder="Pilih rolemu..."
					error={formik.errors.level}
					touched={formik.touched.level}
				/>

				<Button floated="right" type="submit" color="blue">
					Tambah Pengguna
				</Button>
			</form>
		</Segment>
	);
};

export default AddUser;
