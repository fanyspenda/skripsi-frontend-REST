export interface TokenAction {
	type: string;
	token: string;
}

export const TokenReducer = (state: string, action: TokenAction) => {
	switch (action.type) {
		case "SAVE_TOKEN":
			localStorage.setItem("token", action.token);
			return action.token;
		case "REMOVE_TOKEN":
			localStorage.removeItem("token");
			return "";
		default:
			return state;
	}
};
