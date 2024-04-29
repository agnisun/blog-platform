import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";

const clientQuery = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={clientQuery}>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
