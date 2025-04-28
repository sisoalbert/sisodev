import React, { useEffect, useRef } from "react";
import { Section } from "../types";

interface CodelabSectionProps {
  section: Section;
}

const CodelabSection: React.FC<CodelabSectionProps> = ({ section }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Apply styling to content elements
      const links = contentRef.current.querySelectorAll("a");
      links.forEach((link) => {
        link.classList.add("text-blue-600", "hover:text-blue-800", "underline");
      });

      const lists = contentRef.current.querySelectorAll("ul, ol");
      lists.forEach((list) => {
        list.classList.add("my-4", "pl-5");
      });

      const listItems = contentRef.current.querySelectorAll("li");
      listItems.forEach((item) => {
        item.classList.add("mb-2");
      });

      // Fix heading styles
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      headings.forEach((heading) => {
        heading.classList.add("font-bold", "mb-4", "text-gray-800");

        if (heading.tagName === "H1") {
          heading.classList.add("text-2xl", "md:text-3xl", "mt-2");
        } else if (heading.tagName === "H2") {
          heading.classList.add("text-xl", "md:text-2xl", "mt-6");
        }
      });

      // Style paragraphs
      const paragraphs = contentRef.current.querySelectorAll("p");
      paragraphs.forEach((p) => {
        p.classList.add("my-4", "text-gray-700", "leading-relaxed");
      });
    }
  }, [section]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 animate-fadeIn">
      <div
        ref={contentRef}
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </div>
  );
};

export default CodelabSection;
