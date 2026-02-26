import { figma } from '@figma/code-connect';
import React, { useState } from 'react';

/**
 * Chips component for displaying selectable items
 * Commonly used for tags, filters, or multi-select options
 * 
 * Props:
 * - items: Array of chip items with id and label
 * - onSelect: Callback when a chip is selected/deselected
 * - multiSelect: Allow multiple chips to be selected
 * - variant: Style variant - 'default' or 'filled'
 */
export interface ChipItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface ChipsProps {
  items: ChipItem[];
  onSelect?: (selectedIds: string[]) => void;
  multiSelect?: boolean;
  variant?: 'default' | 'filled';
  selectedIds?: string[];
}

export const Chips = ({
  items,
  onSelect,
  multiSelect = true,
  variant = 'default',
  selectedIds = []
}: ChipsProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedIds));

  const handleChipClick = (id: string) => {
    const chipItem = items.find(item => item.id === id);
    if (chipItem?.disabled) return;

    const newSelected = new Set(selected);

    if (!multiSelect && newSelected.size > 0) {
      newSelected.clear();
    }

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    setSelected(newSelected);
    onSelect?.(Array.from(newSelected));
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {items.map((item) => {
        const isSelected = selected.has(item.id);
        const isDisabled = item.disabled;

        const baseStyle: React.CSSProperties = {
          padding: '8px 12px',
          borderRadius: '16px',
          border: 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        };

        const variantStyle: React.CSSProperties =
          variant === 'filled'
            ? {
                backgroundColor: isSelected ? '#0D99FF' : '#F0F0F0',
                color: isSelected ? 'white' : '#333'
              }
            : {
                backgroundColor: isSelected ? '#E3F2FD' : 'transparent',
                color: isSelected ? '#0D99FF' : '#666',
                border: `1px solid ${isSelected ? '#0D99FF' : '#D0D0D0'}`
              };

        const disabledStyle: Partial<React.CSSProperties> = isDisabled
          ? { opacity: 0.5, cursor: 'not-allowed' }
          : {};

        return (
          <button
            key={item.id}
            onClick={() => handleChipClick(item.id)}
            disabled={isDisabled}
            style={{
              ...baseStyle,
              ...variantStyle,
              ...disabledStyle
            }}
          >
            {item.label}
            {isSelected && variant === 'filled' && (
              <span style={{ marginLeft: '4px' }}>✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

/**
 * Figma Code Connect mapping for Chips
 * Maps Figma design variants to component props
 */
figma.connect(
  Chips,
  'https://www.figma.com/design/[FILE_ID]/[FILE_NAME]?node-id=[NODE_ID]',
  {
    props: {
      items: figma.boolean('multiSelect', {
        true: [
          { id: '1', label: 'Design' },
          { id: '2', label: 'Development' },
          { id: '3', label: 'Testing' }
        ],
        false: [
          { id: '1', label: 'Option 1' },
          { id: '2', label: 'Option 2' },
          { id: '3', label: 'Option 3' }
        ]
      }),
      multiSelect: figma.boolean('multiSelect'),
      variant: figma.enum('Variant', {
        'Default': 'default',
        'Filled': 'filled'
      }),
    },
    example: (props) => <Chips {...props} selectedIds={['1']} />
  }
);
