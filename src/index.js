import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "index.css";
import store from "store";
import reportWebVitals from "reportWebVitals";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const rootEl = document.getElementById("root");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#26c6da",
    },
  },
});

// allow for hot module replacement
const render = () => {
  const App = require("app").default;

  const wrappedApp = (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        {/* For consistent css by MaterialUI  */}
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
  ReactDOM.hydrate(wrappedApp, rootEl);
};

render();
if (module.hot) {
  module.hot.accept("app", render);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
