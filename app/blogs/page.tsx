import { BlogCard } from "@/components/blog-card";
import { Section } from "@/components/ui/section";
import React from "react";
import BlogsAnalytics from "./analytics";
import { Adsense } from "@/components/adsense";
import { query } from "@/lib/hashnode";
import Link from "next/link";
import { Post } from "@/types/posts";

export default async function page() {
  const {
    data: { publication },
  } = await query({
    query: `query($host: String) {
        publication(host: $host){
          posts(first:3){
            edges{
              node{
                title
                slug
                id
                coverImage {
                  url
                }
                publishedAt
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

  const posts: Post[] | undefined = publication?.posts?.edges.map(
    ({ node }: { node: Post }) => node
  );
  console.log("data", posts);

  return (
    <div>
      <BlogsAnalytics />
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <Section>
            <h2 className="text-xl font-bold">Blogs</h2>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              Ready to transform your dev game? Get your hands dirty with
              practical guides on React, React Native, and Next.js, all paired
              with step-by-step video tutorials. Learn by doing, crafting
              beautiful and powerful web apps from scratch. Conquer challenges,
              optimize code, and discover hidden gems that elevate your skills.
              Join my learning journey and let us build something awesome
              together!
            </p>
          </Section>
          <Section>
            {posts?.map((post) => (
              // <BlogCard
              //   key={post.id}
              //   title={post.title}
              //   description={post.title}
              //   tags={["React Native", "React Navigation", "Stack Navigation"]}
              //   link={`/blogs/${post.slug}`}
              // />
              <Link href={`/blogs/${post.slug}`}>
                <div
                  key={post.id}
                  className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6"
                >
                  <div>
                    <img
                      src={post.coverImage.url}
                      alt={post.title}
                      className="h-96 w-full rounded-lg object-cover"
                      loading="lazy"
                      width={500}
                      height={500}
                      decoding="async"
                      data-nimg="intrinsic"
                      data-nimg-fill="true"
                      data-nimg-config="{'sizes': [500, 1000, 2000], 'placeholder': 'blur'}"
                      data-nimg-priority="true"
                      data-nimg-sizes="(max-width: 500) 100vw, 500px"
                      data-nimg-style="{'position': 'absolute', 'top': '0', 'left': '0', 'width': '100%', 'height': '100%', 'object-fit': 'cover'}"
                      data-nimg-placeholder="blur"
                      data-nimg-blur-up="true"
                      data-nimg-blur-up-config="{'sizes': [500, 1000, 2000], 'placeholder': 'blur'}"
                    />
                  </div>
                  <div>
                    <h1>{post.title}</h1>
                    <p>{post.publishedAt}</p>
                  </div>
                </div>
              </Link>
            ))}

            <BlogCard
              title={
                "How to build a todo app with typescript without using any libraries"
              }
              description={
                "In this tutorial we are going to implement a react native todo app with typescript without using any libraries."
              }
              tags={[
                "TypeScript",
                "React Native",
                "React Navigation",
                "Stack Navigation",
                "Drawer Navigation",
              ]}
              link="/blogs/todoapp"
            />
            {/* 

            <BlogCard
              title={
                "How to add drawer and stack navigation with TypeScript in react navigation"
              }
              description={
                "In this tutorial we are going to implement react navigation with typescript."
              }
              tags={[
                "TypeScript",
                "React Native",
                "React Navigation",
                "Stack Navigation",
                "Drawer Navigation",
              ]}
              link="/blogs/drawerandstacknavigation"
            /> */}
          </Section>
          <Section>
            <div className="text-center adsbygoogle mt-2">
              {/* <Adsense  /> */}
            </div>
          </Section>
        </section>
      </main>
    </div>
  );
}
