import { GetServerSideProps } from 'next';

export default function NotionPage(): JSX.Element {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.req.url;
  const components = url.split('/');
  let pageId = components[components.length - 1];
  if (pageId === 'wiki.json?pageId=wiki' || pageId === 'wiki') {
    pageId = process.env.NOTION_WIKI_PAGE_ID;
  }

  return {
    redirect: {
      destination: '/wiki/' + pageId,
      permanent: false,
    },
  };
};
