import * as notionTypes from 'notion-types';

import { Code, NotionRenderer } from 'react-notion-x';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getNotionPagesId, notion } from '@/utils/notion';

import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import React from 'react';

interface Props {
  recordMap: notionTypes.ExtendedRecordMap;
  title: string | null;
}

export default function NotionPage({ recordMap, title }: Props): JSX.Element {
  if (!recordMap) {
    return null;
  }

  return (
    <>
      <Meta
        title={title ?? 'Engineering Wiki'}
        description={title ? undefined : 'All things engineering: processes, best practices, setup guides, and more!'}
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
    const notionResponse = await notion.getPage(pageId);
    const title = getTitle(pageId, notionResponse);

    return {
      props: {
        recordMap: notionResponse,
        title,
      },
      revalidate: 10,
    };
  } catch (ex) {
    console.error({ ex });
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

function getTitle(pageId: string, notionResponse: notionTypes.ExtendedRecordMap): string | null {
  let fullPageId = pageId;
  fullPageId = [fullPageId.slice(0, 20), '-', fullPageId.slice(20)].join('');
  fullPageId = [fullPageId.slice(0, 16), '-', fullPageId.slice(16)].join('');
  fullPageId = [fullPageId.slice(0, 12), '-', fullPageId.slice(12)].join('');
  fullPageId = [fullPageId.slice(0, 8), '-', fullPageId.slice(8)].join('');

  return getTitleForPage(fullPageId, notionResponse);
}

function getTitleForPage(fullPageId: string, notionResponse: notionTypes.ExtendedRecordMap): string | null {
  const pageInfo = notionResponse.block[fullPageId];
  if (pageInfo) {
    const parentId = pageInfo.value.parent_id;
    const properties = pageInfo.value.properties;
    if (properties) {
      const title = properties['title'][0][0];

      const parentTitle = getTitleForPage(parentId, notionResponse);
      if (parentTitle) {
        return `${parentTitle} - ${title}`;
      }
      return title;
    }
  }

  return null;
}
