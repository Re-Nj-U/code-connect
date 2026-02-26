import { figma } from '@figma/code-connect';
import React, { useState } from 'react';

/**
 * Accordion component for collapsible content sections
 * 
 * Props:
 * - items: Array of accordion items with title and content
 * - allowMultiple: Allow multiple items to be open at once
 */
export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion = ({ 
  items, 
  allowMultiple = false 
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    
    if (!allowMultiple && newOpenItems.size > 0) {
      newOpenItems.clear();
    }

    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }

    setOpenItems(newOpenItems);
  };

  return (
    <div style={{ border: '1px solid #EEE', borderRadius: '8px' }}>
      {items.map((item, index) => (
        <div 
          key={item.id}
          style={{ 
            borderBottom: index !== items.length - 1 ? '1px solid #EEE' : 'none' 
          }}
        >
          <button
            onClick={() => toggleItem(item.id)}
            style={{
              width: '100%',
              padding: '16px',
              textAlign: 'left',
              backgroundColor: '#F9F9F9',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s ease'
            }}
          >
            {item.title}
            <span style={{
              transform: openItems.has(item.id) ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              fontSize: '20px'
            }}>
              ▼
            </span>
          </button>
          {openItems.has(item.id) && (
            <div style={{ padding: '16px', backgroundColor: '#FFF' }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Figma Code Connect mapping for Accordion
 * Replace [FILE_ID] and [NODE_ID] with your actual Figma file and component node IDs
 */
figma.connect(Accordion, 'https://www.figma.com/design/[FILE_ID]/[FILE_NAME]?node-id=[NODE_ID]', {
  props: {
    items: figma.boolean('multiple', {
      true: [
        {
          id: 'item-1',
          title: 'Section 1',
          content: 'Content for section 1'
        },
        {
          id: 'item-2',
          title: 'Section 2',
          content: 'Content for section 2'
        }
      ],
      false: [
        {
          id: 'item-1',
          title: 'Section 1',
          content: 'Content for section 1'
        }
      ]
    }),
    allowMultiple: figma.boolean('multiple'),
  },
  example: (props) => <Accordion {...props} />,
});
