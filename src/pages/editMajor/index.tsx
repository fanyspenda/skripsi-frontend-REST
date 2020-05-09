import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Segment, Form, Label, Button } from "semantic-ui-react";
import CustomInputForm from "components/CustomInputForm";
import { editMajorValidationSchema } from "./editMajorValidation";
import { TokenContext } from "contexts/tokenContext";
import { useHistory, useLocation } from "react-router-dom";

const EditMajor: React.FunctionComponent = () => {
	const [major, setMajor] = useState({ id: "", degree: "", name: "" });
	const location = useLocation();
	const history = useHistory();
	const { token } = useContext(TokenContext);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: major,
		onSubmit: (values) => {
			console.log(values);
		},
		validationSchema: editMajorValidationSchema,
	});

	return (
		<Segment basic>
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
				<Button type="submit">Tambah Jurusan</Button>
			</Form>
		</Segment>
	);
};

export default EditMajor;
