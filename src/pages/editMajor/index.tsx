import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { Segment, Form, Label, Button } from "semantic-ui-react";
import CustomInputForm from "components/CustomInputForm";
import { editMajorValidationSchema } from "./editMajorValidation";
import { TokenContext } from "contexts/tokenContext";
import { useHistory, useLocation } from "react-router-dom";
import useAuth from "hooks/useAuth";
import axios from "axios";
import UseLoading from "hooks/useLoading";
import { restUrl } from "serverUrl";

const EditMajor: React.FunctionComponent = () => {
	const [major, setMajor] = useState({ degree: "", name: "" });
	const { token, level, isLevelMatch } = useAuth();
	const { isLoading, setLoadingToTrue, setLoadingToFalse } = UseLoading();
	const location = useLocation();
	const history = useHistory();
	const editMajor = (data: any) => {
		setLoadingToTrue();
		axios
			.put(`${restUrl}major/${location.state}`, data, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then(() => {
				history.push("/majors");
			})
			.catch((error) => alert(error))
			.finally(() => setLoadingToFalse());
	};
	useEffect(() => {
		setLoadingToTrue();
		axios
			.get(`${restUrl}major/${location.state}`, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then((res) => {
				const degree = res.data.name.split(" ")[0];
				const name = res.data.name.replace(`${degree} `, "");
				setMajor({ degree, name });
			})
			.catch((error) => alert(error))
			.finally(() => setLoadingToFalse());
	}, []);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: major,
		onSubmit: (values) => {
			const name = { name: `${values.degree} ${values.name}` };
			editMajor(name);
		},
		validationSchema: editMajorValidationSchema,
	});

	return (
		<Segment basic loading={isLoading}>
			{isLevelMatch(level, 0)}
			<h1>Edit Jurusan</h1>
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
				<Button type="submit" disabled={isLoading} color="green">
					Tambah Jurusan
				</Button>
			</Form>
		</Segment>
	);
};

export default EditMajor;
