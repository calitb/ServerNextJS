import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

import React from 'react';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);

  return initialProps;
};

export default MyDocument;
