import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Components/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComponentHold from "./Components/ComponentsHold/ComponentHold";
import ChatScreen from "./Components/ChatScreen/ChatScreen";
import RegisterPage from "./Components/RegisterPage";
import SignInPage from "./Components/SignInPage";
import { PrivateRoute } from "./Components/Private/PrivateRoute";
import { GlobalContext } from "./GlobalState/GlobalContext";
import PeoplePage from "./Components/PeoplePage/PeoplePage";
import MessagePage from "./Components/MessagesPage/MessagePage";
function App() {
	const [themeMode, setThemeMode] = React.useState("light");

	const { current } = useContext(GlobalContext);

	const theme = {
		light: {
			back: "#ffff",
			col: "#000",
			header: "#ffff",
			footer: "#000",
			boderLine: "#f3f3f5",
			headerCol: "#000",
			bshad: "0px 1px 0px 0px rgba(0, 0, 0, 0.1)",
		},

		dark: {
			back: "#000",
			col: "#fff",
			header: "#000",
			foter: "#000",
			boderLine: "gray",
			headerCol: "#9884E9",
			bshad: "0px 1px 0px 0px rgba(0, 0, 0, 0.1)",
		},
	};

	const toogleTheme = () => {
		themeMode === "light" ? setThemeMode("dark") : setThemeMode("light");
	};

	return (
		<ThemeProvider theme={themeMode === "light" ? theme.light : theme.dark}>
			<GlobalStyles />
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
				}}>
				{" "}
				<Router>
					{current ? <ChatScreen toogleTheme={toogleTheme} /> : null}
					<Routes>
						<Route
							path='/'
							element={
								<PrivateRoute>
									<ComponentHold />
								</PrivateRoute>
							}
						/>
						<Route path='/register' element={<RegisterPage />} />
						<Route
							path='/chat/:id'
							element={
								<PrivateRoute>
									<MessagePage />
								</PrivateRoute>
							}
						/>
						<Route path='/signin' element={<SignInPage />} />
					</Routes>
					{current ? <PeoplePage /> : null}
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
