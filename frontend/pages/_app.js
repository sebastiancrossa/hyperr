// Libraries
import App from "next/app";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

// Component Imports
import Page from "../components/layout/Page";

// --- Styled Components --- //
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import GlobalStyles from "../utils/global";

class MyApp extends App {
  // Will expose all of our specific pages in nested routes to our global props (like Apollo or any other porps we have)
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Will expose the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <div>
        <ApolloProvider client={apollo}>
          <Page>
            <ThemeProvider theme={theme}>
              <>
                <Component {...pageProps} />
                <GlobalStyles />
              </>
            </ThemeProvider>
          </Page>
        </ApolloProvider>
      </div>
    );
  }
}

export default withData(MyApp);
