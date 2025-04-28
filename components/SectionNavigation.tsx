import React from "react";
import { Section } from "../types";

interface SectionNavigationProps {
  sections: Section[];
  currentSectionId: string;
  onSelectSection: (sectionId: string) => void;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  sections,
  currentSectionId,
  onSelectSection,
}) => {
  return (
    <nav className="w-full md:w-64 p-4 md:p-6  md:mr-8 mb-6 md:mb-0 flex-shrink-0">
      <ul className="space-y-1">
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSelectSection(section.id)}
                className={`w-full text-left py-2 px-3 rounded-md transition-all duration-200 ${
                  currentSectionId === section.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                <span className="mr-2 font-medium">{section.order}.</span>
                {section.title}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default SectionNavigation;
