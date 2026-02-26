import { figma } from '@figma/code-connect';
import React from 'react';

/**
 * Card component for content containers
 * 
 * Props:
 * - title: Card heading
 * - description: Card description text
 * - footer: Optional footer content
 * - variant: Card style variant
 */
export interface CardProps {
  title: string;
  description: string;
  footer?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  children?: React.ReactNode;
}

export const Card = ({ 
  title, 
  description, 
  footer,
  variant = 'default',
  children
}: CardProps) => {
  const baseStyle: React.CSSProperties = {
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: 'white'
  };

  const variantStyle: React.CSSProperties = 
    variant === 'elevated' 
      ? { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }
      : variant === 'outlined'
      ? { border: '1px solid #E0E0E0' }
      : { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' };

  return (
    <div style={{ ...baseStyle, ...variantStyle }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
        {title}
      </h2>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666' }}>
        {description}
      </p>
      {children && (
        <div style={{ margin: '16px 0' }}>
          {children}
        </div>
      )}
      {footer && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F0F0F0' }}>
          {footer}
        </div>
      )}
    </div>
  );
};

/**
 * Figma Code Connect mapping for Card
 * This example shows how to map Figma variants to component props
 */
figma.connect(Card, 'https://www.figma.com/design/[FILE_ID]/[FILE_NAME]?node-id=[NODE_ID]', {
  props: {
    title: 'title',
    description: 'description',
    variant: figma.enum('Variant', {
      'Default': 'default',
      'Elevated': 'elevated',
      'Outlined': 'outlined'
    }),
  },
  example: (props) => (
    <Card {...props} footer={<button style={{ padding: '8px 16px' }}>Learn More</button>} />
  ),
});
