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
    <div className="h-screen w-full flex flex-col">
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col md:flex-row flex-1 h-full">
          <div className="w-64 bg-gray-50 h-full overflow-y-auto">
            <div className="pb-8">
              <SectionNavigation
                sections={data.sections}
                currentSectionId={currentSectionId}
                onSelectSection={setCurrentSectionId}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto pb-12">
              <div className="mb-6 pt-4">
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
