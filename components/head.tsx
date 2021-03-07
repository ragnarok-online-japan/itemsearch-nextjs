import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  keyword: string;
  type: string;
  image: string;
  url: string;
}

export default ({
  title,
  description,
  keyword,
  type,
  image,
  url
}: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title} />
    </Head>
  );
};