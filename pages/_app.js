import * as React from 'react';
import NextApp from 'next/app';

import '../src/styles/styles.scss';

class App extends NextApp {
  render() {
    const { Component, ...pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}
export default App;
