import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import ClientRouter from '../components/ClientRouter';
import { Provider } from '@shopify/app-bridge-react';
import '@shopify/polaris/styles.css';

class MyApp extends App {
  render() {
    const { Component, pageProps, shopOrigin } = this.props;
    const config = { apiKey: API_KEY, shopOrigin, forceRedirect: true };

    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
        <ClientRouter />
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

MyApp.getInitialProps = async ({ctx}) => {
  return {
    shopOrigin: ctx.query.shop,
  }
}

export default MyApp;
