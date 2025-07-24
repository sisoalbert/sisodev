import React from "react";
import type { Section } from "../types";

interface ReadOnlySectionSidebarProps {
  sections: Section[];
  currentSectionId: string | null;
  onSectionSelect: (section: Section) => void;
}

const ReadOnlySectionSidebar: React.FC<ReadOnlySectionSidebarProps> = ({
  sections,
  currentSectionId,
  onSectionSelect,
}) => {
  return (
    <div
      style={{
        width: "250px",
        height: "calc(100vh - 64px)",
        backgroundColor: "#f8fafc",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1rem",
          paddingBottom: "0.5rem",
          flexShrink: 0,
        }}
      ></div>

      <div
        style={{
          flex: 1,
          padding: "0 1rem 4rem 1rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {sections.length === 0 ? (
          <div
            style={{
              padding: "1rem",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            No sections available.
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                backgroundColor:
                  currentSectionId === section.id ? "#eff6ff" : "white",
                borderColor:
                  currentSectionId === section.id ? "#3b82f6" : "#e2e8f0",
                cursor: "pointer",
              }}
              onClick={() => onSectionSelect(section)}
            >
              <div
                style={{
                  padding: "0.75rem",
                }}
              >
                <div
                  style={{
                    marginBottom: "0.5rem",
                  }}
                ></div>

                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {section.name || `Section ${index + 1}`}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReadOnlySectionSidebar;
