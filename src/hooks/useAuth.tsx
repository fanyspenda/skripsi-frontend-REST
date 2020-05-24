import JwtDecode from "jwt-decode";
import { useContext } from "react";
import { TokenContext } from "contexts/tokenContext";
import { useHistory, Redirect } from "react-router-dom";
import { decodedToken } from "interfaces/tokenInterface";

const useAuth = () => {
	const history = useHistory();
	const { dispatch, token } = useContext(TokenContext);
	let name = "";
	let level = 0;
	try {
		const decoded: decodedToken = JwtDecode(token || " ");
		name = decoded.name;
		level = decoded.level;
	} catch (error) {
		console.log(error);
	}

	const isLevelMatch = (input: number, required: number) => {
		isTokenValid();
		if (input !== required) {
			alert("anda tidak berhak masuk sini...");
			dispatch({ token: "", type: "REMOVE_TOKEN" });
			history.push("/login");
		}
	};

	const isTokenValid = () => {
		if (!token) {
			history.replace("/login");
		}
	};

	return { name, level, token, isLevelMatch, isTokenValid };
};

export default useAuth;
