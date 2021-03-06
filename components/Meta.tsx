import Head from 'next/head';

interface Props {
  title: string;
  description?: string;
  image?: string;
  url: string;
  author?: string;
}

export default function Meta({ title, description, image, url, author }: Props): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      {author && <meta name="author" content={author}></meta>}
      {description && <meta name="description" content={description}></meta>}
      <meta name="og:type" property="og:type" content="website" />
      <meta name="og:site_name" property="og:site_name" content="calitb.dev"></meta>
      <meta name="og:title" property="og:title" content={title} />
      {description && <meta name="og:description" property="og:description" content={description} />}
      <meta name="og:url" property="og:url" content={`https://calitb.dev/${url}`} />
      {image && <meta name="og:image" property="og:image" content={image} />}

      <meta name="twitter:card" content="summary" />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:site" content="@calitb" />
    </Head>
  );
}
