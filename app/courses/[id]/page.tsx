/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Mv5MLGHGCuS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="w-full py-6 space-y-6 md:py-12">
      <div className="container space-y-4 px-4 md:px-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Introduction to CSS
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Learn the basics of CSS.
          </p>
        </div>
        <div className="grid items-center grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          <div className="flex items-center space-x-2 text-sm">
            <img
              alt="Instructor"
              className="rounded-full object-cover"
              height="40"
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
            <div className="space-y-0.5">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Instructor
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <ClockIcon className="h-4 w-4" />
            <div className="space-y-0.5">
              <div className="font-medium">2h 30m</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Duration
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="/courses/1"
          >
            Udemy
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="#"
          >
            YouTube
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Egghead
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 py-8 md:py-12 md:px-6">
          <div className="grid items-start gap-4 prose lg:grid-cols-2 lg:gap-8 lg:prose-lg xl:gap-12 dark:prose-dark">
            <div>
              <p>
                This course is an introduction to Cascading Style Sheets (CSS),
                the language used to style the visual presentation of web pages.
                You will learn the basics of CSS syntax, how to apply styles to
                HTML elements, and best practices for organizing and managing
                your stylesheets.
              </p>
              <p>
                By the end of this course, you will be able to create attractive
                and responsive web designs using CSS, and you will have a solid
                foundation for further exploration of advanced CSS techniques.
              </p>
            </div>
            <div>
              <img
                alt="Course Image"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="350"
                src="/placeholder.svg"
                width="600"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 md:px-6">
        <div className="grid items-start gap-4 prose lg:grid-cols-2 lg:gap-8 lg:prose-lg xl:gap-12 dark:prose-dark">
          <div>
            <h3>What you'll learn</h3>
            <ul>
              <li>How to style text and fonts using CSS properties.</li>
              <li>How to apply colors and backgrounds to HTML elements.</li>
              <li>
                How to create and use CSS classes and IDs to target specific
                elements.
              </li>
              <li>
                How to add margins, borders, and padding to control the layout
                of a web page.
              </li>
              <li>How to create multi-column layouts using CSS.</li>
            </ul>
          </div>
          <div>
            <h3>Prerequisites</h3>
            <p>
              This course is designed for beginners with no prior experience in
              CSS or web design. Familiarity with HTML is recommended but not
              required.
            </p>
          </div>
        </div>
      </div>
      <div className="container px-4 py-8 md:py-12 md:px-6">
        <div className="grid items-start gap-4 prose lg:grid-cols-2 lg:gap-8 lg:prose-lg xl:gap-12 dark:prose-dark">
          <div>
            <h3>Meet the Instructor</h3>
            <p>
              John Doe is a web designer and front-end developer with over 10
              years of experience in creating beautiful and user-friendly
              websites. He is passionate about sharing his knowledge of web
              design and CSS with others, and he is known for his clear and
              engaging teaching style.
            </p>
          </div>
          <div>
            <h3>About the Instructor</h3>
            <p>
              John Doe is a web designer and front-end developer with over 10
              years of experience in creating beautiful and user-friendly
              websites. He is passionate about sharing his knowledge of web
              design and CSS with others, and he is known for his clear and
              engaging teaching style.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 py-8 md:py-12 md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Reviews for Introduction to CSS
            </h2>
            <div className="flex items-start space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  alt="User"
                  className="rounded-full object-cover"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="flex items-center space-x-2 text-sm">
                  <div className="font-medium">Alice Johnson</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    3 days ago
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted" />
              </div>
            </div>
            <div className="prose prose-sm lg:prose-lg xl:prose-lg">
              <p>
                I really enjoyed this course. The instructor did a great job of
                explaining the concepts in a clear and easy-to-understand
                manner. The hands-on examples were very helpful, and I feel more
                confident in my ability to style web pages with CSS after taking
                this course.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  alt="User"
                  className="rounded-full object-cover"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="flex items-center space-x-2 text-sm">
                  <div className="font-medium">Bob Smith</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    1 week ago
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted" />
              </div>
            </div>
            <div className="prose prose-sm lg:prose-lg xl:prose-lg">
              <p>
                The course was okay, but I felt that some of the topics were not
                covered in enough detail. I would have liked to see more
                examples and practical exercises to help reinforce the concepts.
                Overall, it was a decent introduction to CSS, but I think there
                is room for improvement.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  alt="User"
                  className="rounded-full object-cover"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="flex items-center space-x-2 text-sm">
                  <div className="font-medium">Eva Brown</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    2 weeks ago
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted" />
              </div>
            </div>
            <div className="prose prose-sm lg:prose-lg xl:prose-lg">
              <p>
                I found this course to be extremely helpful in understanding the
                fundamentals of CSS. The instructor did an excellent job of
                breaking down the concepts and providing real-world examples to
                illustrate how CSS can be used to style web pages. I would
                highly recommend this course to anyone who wants to learn CSS
                from scratch.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  alt="User"
                  className="rounded-full object-cover"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="flex items-center space-x-2 text-sm">
                  <div className="font-medium">Mark Wilson</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    4 days ago
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted" />
              </div>
            </div>
            <div className="prose prose-sm lg:prose-lg xl:prose-lg">
              <p>
                The course was well-structured, and the instructor did a great
                job of explaining the concepts. However, I felt that some of the
                topics were not covered in enough detail, and I would have liked
                to see more hands-on examples to help reinforce the learning.
                Overall, it was a good introduction to CSS, but I think there is
                room for improvement.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  alt="User"
                  className="rounded-full object-cover"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="flex items-center space-x-2 text-sm">
                  <div className="font-medium">Sophia Lee</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    1 week ago
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </div>
            </div>
            <div className="prose prose-sm lg:prose-lg xl:prose-lg">
              <p>
                I really enjoyed this course. The instructor did a great job of
                explaining the concepts in a clear and easy-to-understand
                manner. The hands-on examples were very helpful, and I feel more
                confident in my ability to style web pages with CSS after taking
                this course.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button size="lg" variant="outline">
              Read More Reviews
            </Button>
          </div>
        </div>
      </div>
      <div className="container px-4 py-12 md:py-24 md:px-6">
        <div className="grid items-start gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col gap-1">
            <Link className="font-medium" href="#">
              Introduction to HTML
            </Link>
            <Link className="text-sm" href="#">
              by John Doe
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <Link className="font-medium" href="#">
              Mastering JavaScript
            </Link>
            <Link className="text-sm" href="#">
              by Alice Johnson
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <Link className="font-medium" href="#">
              Web Design Fundamentals
            </Link>
            <Link className="text-sm" href="#">
              by Mark Wilson
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <Link className="font-medium" href="#">
              CSS Styling Workshop
            </Link>
            <Link className="text-sm" href="#">
              by Sophia Lee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
