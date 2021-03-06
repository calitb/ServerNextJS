import * as notionTypes from 'notion-types';

import { Code, NotionRenderer } from 'react-notion-x';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getNotionPagesId, notion } from '@/utils/notion';

import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import React from 'react';

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

  const pageIds = await getNotionPagesId();
  const paths = pageIds.map((pageId) => ({ params: { pageId } }));

  return {
    paths,
    fallback: true,
  };
};
