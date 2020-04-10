import * as yup from "yup";

const RegisterSchema = yup.object().shape({
	name: yup
		.string()
		.typeError("Input harus huruf")
		.required("Nama harus diisi"),
	password: yup
		.string()
		.min(8, "password Kurang Panjang")
		.max(16, "password terlalu panjang")
		.required("Tahun masuk harus diisi"),
	email: yup
		.string()
		.email("Email Tidak Valid")
		.required("Email harus diisi"),
});

export default RegisterSchema;
