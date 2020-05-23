import * as yup from "yup";

const EditUserValidationSchema = yup.object().shape({
	name: yup
		.string()
		.typeError("Input harus huruf")
		.required("Nama harus diisi"),
	email: yup
		.string()
		.email("Email Tidak Valid")
		.required("Email harus diisi"),
	level: yup.number().required("Role harus diisi"),
});

export default EditUserValidationSchema;
