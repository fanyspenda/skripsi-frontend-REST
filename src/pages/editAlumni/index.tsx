import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Segment, Button, Grid, GridColumn } from "semantic-ui-react";
import axios from "axios";
import CustomInputForm from "../../components/CustomInputForm";
import CustomDropdownForm from "../../components/CustomDropdownForm";
import alumniInterface from "../../interfaces/alumniInterface";
import { useHistory, useLocation } from "react-router";
import alumniValidationSchema from "./editAlumniValidation";
import { major } from "interfaces/majorInterface";
import useAuth from "hooks/useAuth";

interface inputAlumni extends alumniInterface {
	data_source: string;
}

interface majorDropdown {
	text: string;
	value: string;
}

const EditAlumni: React.FunctionComponent = () => {
	const location: any = useLocation();
	const alumniId: string = location.state;
	const history = useHistory();
	const { token, level, isLevelMatch } = useAuth();
	const [alumni, setAlumni] = useState<inputAlumni>({
		name: "",
		major: "",
		entry_year: 0,
		graduate_year: 0,
		email: "",
		work_at: "",
		work_position: "",
		data_source: "",
	});
	const [isDisabled, setIsDisabled] = useState(false);
	const [majors, setMajors] = useState<majorDropdown[]>([
		{ text: "", value: "" },
	]);
	const getMajors = () => {
		axios
			.get("http://localhost:4000/major?page=1&limit=0", {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then((res) => {
				let majorsArray: majorDropdown[] = [];
				res.data.data.map((values: major, index: number) => {
					majorsArray.push({ text: values.name, value: values.name });
				});
				setMajors(majorsArray);
			});
	};
	useEffect(() => {
		getMajors();
		handleInitialValue(alumniId);
	}, []);

	const handleInitialValue = (id: string) => {
		axios
			.get(`http://localhost:4000/alumni/${id}`, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then((res) => {
				setAlumni(res.data as inputAlumni);
				return;
			})
			.catch((err) => {
				alert(err);
			});
	};

	const handleSubmit = (id: string, data: inputAlumni) => {
		setIsDisabled(true);
		console.log(data);
		axios
			.put(`http://localhost:4000/alumni/${id}`, data)
			.then((res) => {
				alert("Berhasil menyimpan data! \n" + res.data);
				history.push("/alumni");
			})
			.catch((err) => alert(`Error inputing data: ${err}`))
			.finally(() => {
				setIsDisabled(false);
			});
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: alumni,
		onSubmit: (values: inputAlumni) => handleSubmit(alumniId, values),
		validationSchema: alumniValidationSchema,
	});

	return (
		<Segment basic>
			{isLevelMatch(level, 0)}
			<h1>Tambah data Alumni</h1>
			<form onSubmit={formik.handleSubmit}>
				<CustomInputForm
					label="Nama"
					name="name"
					onChange={formik.handleChange}
					value={formik.values.name}
					touched={formik.touched.name}
					error={formik.errors.name}
				/>
				<CustomInputForm
					label="Tahun Mulai Kuliah"
					name="entry_year"
					onChange={formik.handleChange}
					value={formik.values.entry_year.toString()}
					touched={formik.touched.entry_year}
					error={formik.errors.entry_year}
				/>
				<CustomInputForm
					label="Tahun Lulus"
					name="graduate_year"
					onChange={formik.handleChange}
					value={formik.values.graduate_year.toString()}
					touched={formik.touched.graduate_year}
					error={formik.errors.graduate_year}
				/>
				<CustomDropdownForm
					label="Jurusan"
					placeholder="Pilih Jurusan"
					value={formik.values.major}
					onChange={(event, data) =>
						formik.setFieldValue("major", data.value)
					}
					options={majors}
					touched={formik.touched.major}
					error={formik.errors.major}
				/>

				<CustomInputForm
					label="Nama Tempat Kerja/Perusahaan"
					name="work_at"
					onChange={formik.handleChange}
					value={formik.values.work_at}
					touched={formik.touched.work_at}
					error={formik.errors.work_at}
				/>
				<CustomInputForm
					label="jabatan"
					name="work_position"
					onChange={formik.handleChange}
					value={formik.values.work_position}
					touched={formik.touched.work_position}
					error={formik.errors.work_position}
				/>
				<CustomInputForm
					label="Email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					touched={formik.touched.email}
					error={formik.errors.email}
				/>
				<br />
				<Segment textAlign="right" basic>
					<Button type="submit" color="blue" disabled={isDisabled}>
						Simpan Data Alumni
					</Button>
					<Button onClick={() => history.push("/alumni")}>
						Batal
					</Button>
				</Segment>
			</form>
		</Segment>
	);
};

export default EditAlumni;
