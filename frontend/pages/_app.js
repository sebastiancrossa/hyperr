// Libraries
import App from "next/app";

// Component Imports
import Page from "../components/layout/Page";

// --- Styled Components --- //
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import GlobalStyles from "../utils/global";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <div>
        <Page>
          <ThemeProvider theme={theme}>
            <>
              <Component />
              <GlobalStyles />
            </>
          </ThemeProvider>
        </Page>
      </div>
    );
  }
}

export default MyApp;
