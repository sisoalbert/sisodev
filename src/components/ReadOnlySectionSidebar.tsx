import React from 'react';
import type { Section } from '../types';

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
    <div style={{
      width: '250px',
      height: '100%',
      backgroundColor: '#f8fafc',
      borderRight: '1px solid #e2e8f0',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
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
            No sections available.
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                backgroundColor: currentSectionId === section.id ? '#eff6ff' : 'white',
                borderColor: currentSectionId === section.id ? '#3b82f6' : '#e2e8f0',
                cursor: 'pointer'
              }}
              onClick={() => onSectionSelect(section)}
            >
              <div style={{
                padding: '0.75rem'
              }}>
                <div style={{
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    Section {index + 1}
                  </span>
                </div>
                
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  {section.name || `Section ${index + 1}`}
                </div>
                
                <div style={{
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

export default ReadOnlySectionSidebar;