import React, { useState } from "react";
import { CodelabData } from "../types";
import CodelabHeader from "./CodelabHeader";
import SectionNavigation from "./SectionNavigation";
import CodelabSection from "./CodelabSection";

interface CodelabContentProps {
  data: CodelabData;
}

const CodelabContent: React.FC<CodelabContentProps> = ({ data }) => {
  const [currentSectionId, setCurrentSectionId] = useState<string>(
    data.sections[0]?.id || ""
  );

  const currentSection = data.sections.find(
    (section) => section.id === currentSectionId
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CodelabHeader data={data} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <SectionNavigation
            sections={data.sections}
            currentSectionId={currentSectionId}
            onSelectSection={setCurrentSectionId}
          />

          <div className="flex-grow">
            {currentSection && <CodelabSection section={currentSection} />}
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Firebase Codelab © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default CodelabContent;
