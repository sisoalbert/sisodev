/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0B6c1nzJngh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Component() {
  return (
    <>
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Online Courses
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Browse our curated list of online courses available on various
              platforms.
            </p>
          </div>
          <div className="grid max-w-5xl mx-auto gap-4 px-4 md:gap-6 lg:gap-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-bold tracking-wide">
                  Learning React: Modern Patterns
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn the latest patterns in React
                </p>
              </div>
              <Link
                className="inline-flex items-center rounded-lg border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href={`/courses/${1}`}
              >
                <span className="flex items-center space-x-2">
                  View on Udemy
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-bold tracking-wide">
                  CSS Layouts for Beginners
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Master CSS layout techniques
                </p>
              </div>
              <Link
                className="inline-flex items-center rounded-lg border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                <span className="flex items-center space-x-2">
                  View on YouTube
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-bold tracking-wide">
                  Advanced JavaScript: ES6 and Beyond
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Master modern JavaScript features
                </p>
              </div>
              <Link
                className="inline-flex items-center rounded-lg border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                <span className="flex items-center space-x-2">
                  View on Egghead
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
