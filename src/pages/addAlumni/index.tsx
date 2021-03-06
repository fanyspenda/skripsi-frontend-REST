import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import { Segment, Button } from "semantic-ui-react";
import axios from "axios";
import CustomInputForm from "../../components/CustomInputForm";
import CustomDropdownForm from "../../components/CustomDropdownForm";
import alumniInterface from "../../interfaces/alumniInterface";
import { useHistory } from "react-router";
import alumniSchema from "./addAlumniValidation";
import { restUrl } from "serverUrl";
import useAuth from "hooks/useAuth";
import { major } from "interfaces/majorInterface";
interface inputAlumni extends alumniInterface {
	data_source: string;
}

const alumni: inputAlumni = {
	name: "",
	entry_year: 1986,
	graduate_year: new Date().getFullYear(),
	major: "",
	work_at: "",
	work_position: "",
	email: "",
	data_source: "manual",
};

interface majorDropdown {
	text: string;
	value: string;
}

const AddAlumni: React.FunctionComponent = () => {
	const history = useHistory();
	const { isLevelMatch, level, token } = useAuth();
	const [isDisabled, setIsDisabled] = useState(false);
	const [majors, setMajor] = useState<majorDropdown[]>([
		{ text: "", value: "" },
	]);
	const getMajors = () => {
		axios
			.get(`${restUrl}major?page=1&limit=0`, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then((res) => {
				let majorsArray: majorDropdown[] = [];
				res.data.data.map((values: major, index: number) => {
					majorsArray.push({ text: values.name, value: values.name });
				});
				setMajor(majorsArray);
			});
	};

	useEffect(() => {
		getMajors();
	}, []);
	const formik = useFormik({
		initialValues: alumni,
		onSubmit: (values) => {
			setIsDisabled(true);
			axios
				.post(`${restUrl}alumni`, values, {
					headers: {
						authorization: `bearer ${token}`,
					},
				})
				.then((res) => {
					alert("Berhasil menyimpan data! \n" + res.data);
					history.push("/alumni");
				})
				.catch((err) => alert(`Error inputing data: ${err}`))
				.finally(() => {
					setIsDisabled(false);
				});
		},
		validationSchema: alumniSchema,
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
					<Button>Batal</Button>
				</Segment>
			</form>
		</Segment>
	);
};

export default AddAlumni;
