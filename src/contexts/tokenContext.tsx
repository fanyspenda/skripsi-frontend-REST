import React, { createContext, useReducer, useEffect } from "react";
import { TokenReducer, TokenAction } from "reducers/tokenReducer";

export interface TokenContextProviderProps {}

//mengatur initial value dari context token
export const TokenContext = createContext<{
	token: string;
	dispatch: React.Dispatch<TokenAction>;
}>({
	token: "",
	dispatch: () => null,
});

const TokenContextProvider: React.SFC<TokenContextProviderProps> = ({
	children,
}) => {
	//initial value dioverride di sini ketika jalan pertama kali
	const [token, dispatch] = useReducer(TokenReducer, "halo", (): string => {
		const savedToken = localStorage.getItem("token");
		return savedToken || "";
	});
	return (
		<TokenContext.Provider value={{ token, dispatch }}>
			{children}
		</TokenContext.Provider>
	);
};

export default TokenContextProvider;
