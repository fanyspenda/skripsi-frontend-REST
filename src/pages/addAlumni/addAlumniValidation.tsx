import * as yup from "yup";

const AlumniSchema = yup.object().shape({
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
		.min(
			3,
			`Nama Tempat Kerja terlalu pendek (kosongi jika belum bekerja)`
		),
	work_position: yup
		.string()
		.min(2, `Jabatan Pekerjaan (kosongi jika belum bekerja)`),
	email: yup
		.string()
		.email("Email Tidak Valid")
		.required("Email harus diisi"),
});

export default AlumniSchema;
