import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie';

class MyApp extends App {
  state = {
    shopOrigin: Cookies.get('shopOrigin'),
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <AppProvider
          shopOrigin={this.state.shopOrigin}
          apiKey={API_KEY}
          forceRedirect
        >
          <Component {...pageProps} />
        </AppProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
