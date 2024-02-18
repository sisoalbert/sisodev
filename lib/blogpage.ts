import { query } from "@/lib/hashnode";
import { Page } from "@/types/pages";

export async function getPageBySlug(slug: string) {
  const {
    data: { publication },
  } = await query({
    query: `
      query($host: String!, $slug: String!) {
        publication(host: $host) {
          staticPage(slug: $slug) {
            content {
              html
            }
            id
            seo {
              description
            }
            slug
            title
          }
        }
      }
    `,
    variables: {
      host: process.env.NEXT_PUBLIC_HASHNODE_HOST,
      slug,
    },
  });

  console.log(process.env.NEXT_PUBLIC_HASHNODE_HOST);

  const page = publication?.staticPage as Page;

  return page;
}
