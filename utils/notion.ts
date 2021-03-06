import { NotionAPI } from 'notion-client';
import { getAllPagesInSpace } from 'notion-utils';

export const notion = new NotionAPI();

export async function getNotionPagesId(): Promise<string[]> {
  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const notionResponse = await getAllPagesInSpace(process.env.NOTION_WIKI_PAGE_ID, process.env.NOTION_SPACE_ID, notion.getPage.bind(notion), {
    traverseCollections: true,
  });

  const pages = notionResponse[process.env.NOTION_WIKI_PAGE_ID].block;
  const pagesIds = Object.keys(pages);

  const subPagesId: string[] = pagesIds.reduce((acum, pageId) => {
    const page = pages[pageId];
    const subpages = page.value.content;
    if (subpages) {
      return acum.concat(subpages);
    }
    return acum;
  }, [] as string[]);

  const allPagesId = pagesIds.concat(subPagesId);

  return allPagesId.map((pageId) => pageId.split('-').join(''));
}
