import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MantineProvider withNormalizeCSS withGlobalStyles withCSSVariables>
			<App />
		</MantineProvider>
	</React.StrictMode>
);
