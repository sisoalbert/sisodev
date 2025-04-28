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
      <main className="py-6">
        <div className="flex flex-col md:flex-row">
          <SectionNavigation
            sections={data.sections}
            currentSectionId={currentSectionId}
            onSelectSection={setCurrentSectionId}
          />
          <div className="flex-grow">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                {currentSectionId === data.sections[0]?.id && (
                  <CodelabHeader data={data} />
                )}
              </div>
              {currentSection && <CodelabSection section={currentSection} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodelabContent;
