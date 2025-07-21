import React from 'react';
import type { Section } from '../types';

interface SectionSidebarProps {
  sections: Section[];
  currentSectionId: string | null;
  onSectionSelect: (section: Section) => void;
  onAddSection: () => void;
  onRemoveSection: (id: string) => void;
  onUpdateSectionName: (id: string, name: string) => void;
}

const SectionSidebar: React.FC<SectionSidebarProps> = ({
  sections,
  currentSectionId,
  onSectionSelect,
  onAddSection,
  onRemoveSection,
  onUpdateSectionName,
}) => {
  return (
    <div style={{
      width: '250px',
      height: '100%',
      backgroundColor: '#f8fafc',
      borderRight: '1px solid #e2e8f0',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#374151',
          margin: 0
        }}>
          Sections
        </h3>
        <button
          onClick={onAddSection}
          style={{
            padding: '0.375rem 0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}
        >
          + Add
        </button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        {sections.length === 0 ? (
          <div style={{
            padding: '1rem',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            No sections yet. Add one to get started.
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                backgroundColor: currentSectionId === section.id ? '#eff6ff' : 'white',
                borderColor: currentSectionId === section.id ? '#3b82f6' : '#e2e8f0'
              }}
            >
              <div style={{
                padding: '0.75rem',
                cursor: 'pointer'
              }}
              onClick={() => onSectionSelect(section)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    Section {index + 1}
                  </span>
                  {sections.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSection(section.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        padding: '0.125rem'
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <input
                  type="text"
                  value={section.name}
                  onChange={(e) => {
                    e.stopPropagation();
                    onUpdateSectionName(section.id, e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={`Section ${index + 1} Name`}
                  style={{
                    width: '100%',
                    padding: '0.375rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'white'
                  }}
                />
                
                <div style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  {section.content ? 
                    `${section.content.length > 50 ? section.content.substring(0, 50) + '...' : section.content}` : 
                    'No content yet'
                  }
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SectionSidebar;