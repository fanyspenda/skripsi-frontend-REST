import React, { useState } from "react";

const UseLoading = () => {
	const [isLoading, setIsLoading] = useState(false);
	const setLoadingToTrue = () => {
		setIsLoading(true);
	};
	const setLoadingToFalse = () => {
		setIsLoading(false);
	};
	return {
		isLoading,
		setLoadingToTrue,
		setLoadingToFalse,
	};
};

export default UseLoading;
