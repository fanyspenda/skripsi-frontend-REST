import * as yup from "yup";

const AddUserValidationSchema = yup.object().shape({
	name: yup
		.string()
		.typeError("Input harus huruf")
		.required("Nama harus diisi"),
	password: yup
		.string()
		.min(8, "password Kurang Panjang")
		.max(16, "password terlalu panjang")
		.required("password harus diisi"),
	email: yup
		.string()
		.email("Email Tidak Valid")
		.required("Email harus diisi"),
	level: yup.number().required("Role harus diisi"),
});

export default AddUserValidationSchema;
