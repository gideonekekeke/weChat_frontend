import React, { createContext } from "react";

export const GlobalContext = createContext();

export const AuthProvider = ({ children }) => {
	const [current, setCurrent] = React.useState(null);

	React.useEffect(() => {
		const saveItem = JSON.parse(localStorage.getItem("messanger"));

		setCurrent(saveItem);
		console.log("this is the current user", current);
	}, []);
	return (
		<GlobalContext.Provider value={{ current }}>
			{children}
		</GlobalContext.Provider>
	);
};
