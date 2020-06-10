import React from "react";
import { Segment, Button } from "semantic-ui-react";
import UseLoading from "hooks/useLoading";
import useAuth from "hooks/useAuth";
import { useFormik } from "formik";
import CustomInputForm from "components/CustomInputForm";
import { useLocation, useHistory } from "react-router-dom";
import { userType } from "interfaces/userInterface";
import CustomDropdownForm from "components/CustomDropdownForm";
import EditUserValidationSchema from "./editUserValidation";
import Axios from "axios";
import { restUrl } from "serverUrl";

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

const EditUser: React.FunctionComponent = () => {
	const location = useLocation();
	const history = useHistory();
	const user: any = location.state;
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();
	const { isLevelMatch, token, level } = useAuth();
	const formik = useFormik({
		initialValues: {
			name: user.name as string,
			level: user.level as number,
			email: user.email as string,
		},
		validationSchema: EditUserValidationSchema,
		onSubmit: (values) => {
			setLoadingToTrue();
			Axios.put(`${restUrl}user/${user._id}`, values, {
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
			<h1>Ubah Data Pengguna</h1>
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
					Ubah Data Pengguna
				</Button>
			</form>
		</Segment>
	);
};

export default EditUser;
