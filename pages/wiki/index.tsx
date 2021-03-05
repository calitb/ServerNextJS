import { GetServerSideProps } from 'next';

export default function NotionPage(): JSX.Element {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: 'https://www.notion.so/Engineering-Wiki-fe57c54e12574cc6801070cf719ccd1f',
      permanent: false,
    },
  };
};
