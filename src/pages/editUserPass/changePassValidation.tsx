import * as yup from "yup";

const UserPassSchema = yup.object().shape({
	password: yup
		.string()
		.min(8, "password Kurang Panjang")
		.max(16, "password terlalu panjang")
		.required("Password harus diisi"),
	retypePassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "password tidak sama!")
		.required("Password harus diisi"),
});

export default UserPassSchema;
