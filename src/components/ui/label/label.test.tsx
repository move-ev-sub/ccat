import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './label';

describe('Label', () => {
  it('renders correctly with default props', () => {
    render(<Label>Test Label</Label>);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('data-slot', 'label');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('leading-none');
    expect(label).toHaveClass('font-medium');
    expect(label).toHaveClass('select-none');
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Custom Label</Label>);

    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-class');
  });

  describe('accessibility', () => {
    it('supports htmlFor attribute', () => {
      render(<Label htmlFor="test-input">Input Label</Label>);

      const label = screen.getByText('Input Label');
      expect(label).toHaveAttribute('for', 'test-input');
    });
  });

  describe('disabled state', () => {
    it('applies disabled styles when parent is disabled', () => {
      render(
        <div data-disabled="true">
          <Label>Disabled Label</Label>
        </div>
      );

      const label = screen.getByText('Disabled Label');
      expect(label).toHaveClass(
        'group-data-[disabled=true]:pointer-events-none'
      );
      expect(label).toHaveClass('group-data-[disabled=true]:opacity-50');
    });

    it('applies disabled styles when associated input is disabled', () => {
      render(
        <div>
          <Label htmlFor="disabled-input">Input Label</Label>
          <input id="disabled-input" disabled />
        </div>
      );

      const label = screen.getByText('Input Label');
      expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
      expect(label).toHaveClass('peer-disabled:opacity-50');
    });
  });

  describe('styling', () => {
    it('has correct text styling', () => {
      render(<Label>Styled Label</Label>);

      const label = screen.getByText('Styled Label');
      expect(label).toHaveClass('text-sm');
      expect(label).toHaveClass('font-medium');
    });

    it('has correct spacing and layout classes', () => {
      render(<Label>Layout Label</Label>);

      const label = screen.getByText('Layout Label');
      expect(label).toHaveClass('leading-none');
      expect(label).toHaveClass('select-none');
    });
  });
});
