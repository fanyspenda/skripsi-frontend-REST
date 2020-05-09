import * as yup from "yup";

export const addMajorValidationScehma = yup.object().shape({
	degree: yup
		.string()
		.oneOf(["D-III", "D-IV"])
		.required("button harus diisi"),
	name: yup.string().required("nama jurusan belum diisi!"),
});
