import React, { useContext } from "react";
import { useFormik } from "formik";
import { Segment, Form, Label, Button } from "semantic-ui-react";
import CustomInputForm from "components/CustomInputForm";
import { addMajorValidationScehma } from "./addMajorValidation";
import { useHistory } from "react-router-dom";
import useAuth from "hooks/useAuth";
import axios from "axios";
import { restUrl } from "serverUrl";
import UseLoading from "hooks/useLoading";

const initialValues = {
	degree: "",
	name: "",
};

const AddMajor: React.FunctionComponent = () => {
	const history = useHistory();
	const { token, level, isLevelMatch } = useAuth();
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();

	const addMajor = (data: any) => {
		setLoadingToTrue();
		axios
			.post(
				`${restUrl}major`,
				{ name: data },
				{
					headers: {
						authorization: `bearer ${token}`,
					},
				}
			)
			.then(() => {
				history.push("/majors");
			})
			.catch((error) => {
				alert(error);
			})
			.finally(() => setLoadingToFalse());
	};
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			addMajor(`${values.degree} ${values.name}`);
		},
		validationSchema: addMajorValidationScehma,
	});

	return (
		<Segment basic loading={isLoading}>
			{isLevelMatch(level, 0)}
			<h1>Tambah Jurusan</h1>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group inline>
					<div className="field">
						<Label>Gelar</Label>
					</div>

					<div className="field">
						<div className="ui radio checkbox">
							<input
								name="degree"
								type="radio"
								value="D-III"
								checked={formik.values.degree === "D-III"}
								onChange={formik.handleChange}
							/>
							<label>D-III</label>
						</div>
					</div>
					<div className="field">
						<div className="ui radio checkbox">
							<input
								name="degree"
								type="radio"
								value="D-IV"
								checked={formik.values.degree === "D-IV"}
								onChange={formik.handleChange}
							/>
							<label>D-IV</label>
						</div>
					</div>
				</Form.Group>

				{formik.errors.degree && formik.touched.degree && (
					<>
						<Label color="red" pointing="above">
							{formik.errors.degree}
						</Label>

						<br />
						<br />
					</>
				)}
				<CustomInputForm
					error={formik.errors.name}
					touched={formik.touched.name}
					label="Nama Jurusan"
					name="name"
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
				<Button type="submit" color="blue">
					Tambah Jurusan
				</Button>
			</Form>
		</Segment>
	);
};

export default AddMajor;
