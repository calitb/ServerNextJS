import * as notionTypes from 'notion-types';

import { Code, NotionRenderer } from 'react-notion-x';
import { GetStaticPaths, GetStaticProps } from 'next';

import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import { NotionAPI } from 'notion-client';
import React from 'react';
import { getAllPagesInSpace } from 'notion-utils';

interface Props {
  recordMap: notionTypes.ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: Props): JSX.Element {
  if (!recordMap) {
    return null;
  }

  return (
    <>
      <Meta
        title="Engineering Wiki"
        description="All things engineering: processes, best practices, setup guides, and more!"
        url="/notion"
        image="https://images.unsplash.com/photo-1546776230-bb86256870ce?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb"
      />
      <Navbar />

      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={true} components={{ code: Code }} />
    </>
  );
}

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const notion = new NotionAPI();

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const pageId = context.params.pageId as string;

  try {
    const recordMap = await notion.getPage(pageId);
    return {
      props: {
        recordMap,
      },
      revalidate: 10,
    };
  } catch (ex) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    };
  }

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(process.env.NOTION_WIKI_PAGE_ID, process.env.NOTION_SPACE_ID, notion.getPage.bind(notion), {
    traverseCollections: true,
  });

  const paths = Object.keys(pages).map((pageId) => `/wiki/${pageId}`);

  return {
    paths,
    fallback: true,
  };
};
