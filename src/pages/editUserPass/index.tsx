import React, { useEffect } from "react";
import { Card, Segment, Button, Label } from "semantic-ui-react";
import CustomInputForm from "components/CustomInputForm";
import { useFormik } from "formik";
import UserPassSchema from "./changePassValidation";
import { useLocation, useHistory } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Axios from "axios";
import UseLoading from "hooks/useLoading";

const EditUserPass: React.FunctionComponent = () => {
	const user: any = useLocation().state;
	const history = useHistory();
	const { token, isLevelMatch, level } = useAuth();
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();
	const formik = useFormik({
		initialValues: { password: "", retypePassword: "" },
		validationSchema: UserPassSchema,
		onSubmit: (values) => {
			setLoadingToTrue();
			Axios.put(
				`http://localhost:4000/user/resetPass/${user.id}`,
				{
					password: values.password,
				},
				{
					headers: {
						authorization: `bearer ${token}`,
					},
				}
			)
				.then(() => {
					history.replace("/users");
				})
				.catch((err) => {
					alert(err);
				})
				.finally(() => setLoadingToFalse());
		},
	});
	isLevelMatch(level, 0);
	useEffect(() => {
		if (!user.id) history.replace("/users");
	}, []);
	return (
		<form onSubmit={formik.handleSubmit}>
			<Card centered>
				<Segment basic disabled={isLoading}>
					<h1>RESET PASSWORD</h1>
					<Segment textAlign="center" basic>
						<Label color="yellow">
							anda akan mengubah password milik <br />
							{user.name}
						</Label>
					</Segment>
					<CustomInputForm
						label="Password"
						name="password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.errors.password}
						touched={formik.touched.password}
					/>
					<CustomInputForm
						label="Password"
						name="retypePassword"
						type="password"
						value={formik.values.retypePassword}
						onChange={formik.handleChange}
						error={formik.errors.retypePassword}
						touched={formik.touched.retypePassword}
					/>
				</Segment>
				<Button type="submit" color="blue" fluid size="huge">
					UBAH PASSWORD
				</Button>
			</Card>
		</form>
	);
};

export default EditUserPass;
