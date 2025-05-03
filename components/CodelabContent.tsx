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
  
  // State to control the drawer visibility on mobile
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const currentSection = data.sections.find(
    (section) => section.id === currentSectionId
  );
  
  // Function to toggle drawer
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  
  // Function to close drawer (for when a section is selected)
  const closeDrawer = () => setIsDrawerOpen(false);
  
  // Modified section selection handler to close drawer on mobile after selection
  const handleSectionSelect = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    closeDrawer();
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile drawer toggle button - only visible on mobile */}
        <div className="md:hidden bg-white p-4 border-b border-gray-200">
          <button 
            onClick={toggleDrawer}
            className="flex items-center space-x-1 text-blue-600 font-medium"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
            <span>Sections</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-1 h-full relative">
          {/* Mobile drawer overlay - only visible when drawer is open on mobile */}
          {isDrawerOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-10"
              onClick={closeDrawer}
            />
          )}
          
          {/* Side navigation - hidden on mobile by default, shown as drawer when isDrawerOpen is true */}
          <div 
            className={`${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} 
              md:translate-x-0 fixed md:relative z-20 bg-gray-50 h-full overflow-y-auto 
              transition-transform duration-300 ease-in-out w-64 md:w-64`}
          >
            <div className="pb-8">
              {/* Close button for drawer - only visible on mobile */}
              <div className="md:hidden p-4 flex justify-end">
                <button onClick={closeDrawer} className="text-gray-500">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
              <SectionNavigation
                sections={data.sections}
                currentSectionId={currentSectionId}
                onSelectSection={handleSectionSelect}
              />
            </div>
          </div>
          
          {/* Main content - full width on mobile */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto pb-12 px-4 md:px-6">
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
