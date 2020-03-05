import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Segment, Button, Grid, GridColumn } from "semantic-ui-react";
import axios from "axios";
import CustomInputForm from "../../components/CustomInputForm";
import CustomDropdownForm from "../../components/CustomDropdownForm";
import alumniInterface from "../../interfaces/alumniInterface";
import { useHistory } from "react-router";
import { History } from "history";

const majors = [
  {
    value: "D-IV Teknik Informatika",
    text: "D-IV Teknik Informatika"
  },
  {
    value: "D-III Manajemen Informatika",
    text: "D-III Manajemen Informatika"
  },
  { value: "D-Bagindas", text: "D-Bagindas" }
];

const alumniSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("Input harus huruf")
    .required("Nama harus diisi"),
  entry_year: yup
    .number()
    .typeError("input harus angka")
    .min(1982, "Tahun masuk Politeknik minimal adalah 1982")
    .max(
      new Date().getFullYear(),
      "Tahun masuk tidak boleh lebih dari tahun sekarang"
    )
    .required("Tahun masuk harus diisi"),
  graduate_year: yup
    .number()
    .typeError("input harus angka")
    .min(1985, "Tahun Lulus Politeknik minimal adalah 1985")
    .max(
      new Date().getFullYear(),
      "Tahun Lulus tidak boleh lebih dari tahun sekarang"
    )
    .required("Tahun masuk harus diisi"),
  major: yup.string().required("Jurusan harus diisi"),
  work_at: yup
    .string()
    .min(3, `Nama Tempat Kerja terlalu pendek (kosongi jika belum bekerja)`),
  work_position: yup
    .string()
    .min(2, `Jabatan Pekerjaan (kosongi jika belum bekerja)`),
  email: yup
    .string()
    .email("Email Tidak Valid")
    .required("Email harus diisi")
});

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
  data_source: "manual"
};
const AddAlumni: React.FunctionComponent = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const saveData = (data: any) =>
    axios.post("http://localhost:4000/alumni", data);

  const formik = useFormik({
    initialValues: alumni,
    onSubmit: values => {
      setIsDisabled(true);
      console.log(values);
      saveData(values)
        .then(res => {
          alert("Berhasil menyimpan data! \n" + res.data);
          history.push("/listAlumni");
        })
        .catch(err => alert(`Error inputing data: ${err}`))
        .finally(() => {
          setIsDisabled(false);
        });
    },
    validationSchema: alumniSchema
  });

  return (
    <Segment basic>
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
          onChange={(event, data) => formik.setFieldValue("major", data.value)}
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
