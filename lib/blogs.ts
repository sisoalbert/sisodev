import { Post } from "@/types/posts";
import { query } from "./hashnode";

export async function geAllBlogs() {
  try {
    const {
      data: { publication },
    } = await query({
      query: `
          query($host: String!) {
            publication(host: $host) {
              posts(first: 10) {
                edges {
                  node {
                    coverImage {
                      url
                    }
                    id
                    publishedAt
                    slug
                    title
                  }
                }
              }
            }
          }
        `,
      variables: {
        host: process.env.NEXT_PUBLIC_HASHNODE_HOST,
      },
    });

    const posts: Array<Post> = publication.posts.edges.map(
      ({ node }: { node: Post }) => node
    );
    return posts;
  } catch (error) {
    console.log(error);
  }
}
