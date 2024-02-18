import { BlogCard } from "@/components/blog-card";
import { Section } from "@/components/ui/section";
import React from "react";
import BlogsAnalytics from "./analytics";
import { Adsense } from "@/components/adsense";
import Link from "next/link";
import { geAllBlogs } from "@/lib/blogs";
import Image from "next/image";

export default async function page() {
  const blogs = await geAllBlogs();

  return (
    <>
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <BlogsAnalytics />
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-12">Blogs</h1>
            <ul>
              {blogs?.map((post) => {
                return (
                  <li key={post.id} className="grid sm:grid-cols-2 gap-8 mb-16">
                    <Link href={`/blogs/${post.slug}`}>
                      <Image
                        width="600"
                        height="400"
                        className="rounded border border-zinc-200"
                        src={post.coverImage.url}
                        alt=""
                      />
                    </Link>
                    <div>
                      <h2 className="text-2xl pb-5 border-b-2 mb-5">
                        <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-zinc-500">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-us",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
