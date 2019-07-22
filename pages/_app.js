import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import '@shopify/polaris/styles.css';

class MyApp extends App {
  static async getInitialProps(server) {
    const shopOrigin = server.ctx.query.shop;
    return { shopOrigin };
  }

  render() {
    const { Component, pageProps, shopOrigin } = this.props;
    const config = { apiKey: API_KEY, shopOrigin: shopOrigin };

    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default MyApp;
