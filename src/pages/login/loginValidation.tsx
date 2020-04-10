import * as yup from "yup";

const LoginSchema = yup.object().shape({
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

export default LoginSchema;
