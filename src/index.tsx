import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/material-ui-theme";
import { UserContextProvider } from "./context/UserContext";
import { CustomApolloClientProvider } from "./utils/apollo/CustomApolloProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<UserContextProvider>
			<CustomApolloClientProvider>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ThemeProvider>
			</CustomApolloClientProvider>
		</UserContextProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
