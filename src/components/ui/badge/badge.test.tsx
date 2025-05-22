import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders correctly with default props', () => {
    render(<Badge>Default Badge</Badge>);

    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-slot', 'badge');
    expect(badge).toHaveClass('border');
    expect(badge).toHaveClass('border-dashed');
    expect(badge).toHaveClass('bg-background-muted');
    expect(badge).toHaveClass('text-foreground');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);

    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  describe('variants', () => {
    it('renders default variant correctly', () => {
      render(<Badge variant="default">Default Badge</Badge>);

      const badge = screen.getByText('Default Badge');
      expect(badge).toHaveClass('border-foreground');
      expect(badge).toHaveClass('bg-background-muted');
      expect(badge).toHaveClass('text-foreground');
    });

    it('renders warn variant correctly', () => {
      render(<Badge variant="warn">Warning Badge</Badge>);

      const badge = screen.getByText('Warning Badge');
      expect(badge).toHaveClass('border-amber-300');
      expect(badge).toHaveClass('bg-amber-100');
      expect(badge).toHaveClass('text-amber-800');
    });

    it('renders error variant correctly', () => {
      render(<Badge variant="error">Error Badge</Badge>);

      const badge = screen.getByText('Error Badge');
      expect(badge).toHaveClass('border-red-300');
      expect(badge).toHaveClass('bg-red-100');
      expect(badge).toHaveClass('text-red-800');
    });

    it('renders success variant correctly', () => {
      render(<Badge variant="success">Success Badge</Badge>);

      const badge = screen.getByText('Success Badge');
      expect(badge).toHaveClass('border-green-300');
      expect(badge).toHaveClass('bg-green-100');
      expect(badge).toHaveClass('text-green-800');
    });
  });

  describe('accessibility', () => {
    it('has correct semantic role', () => {
      render(<Badge>Status Badge</Badge>);

      const badge = screen.getByText('Status Badge');
      expect(badge).toHaveAttribute('role', 'status');
    });

    it('supports aria-label', () => {
      render(<Badge aria-label="Status indicator">Active</Badge>);

      const badge = screen.getByLabelText('Status indicator');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('responsive design', () => {
    it('has responsive sizing classes', () => {
      render(<Badge>Responsive Badge</Badge>);

      const badge = screen.getByText('Responsive Badge');
      expect(badge).toHaveClass('h-7');
      expect(badge).toHaveClass('sm:h-[1.375rem]');
      expect(badge).toHaveClass('text-sm');
      expect(badge).toHaveClass('sm:text-xs');
    });

    it('has responsive padding classes', () => {
      render(<Badge>Responsive Badge</Badge>);

      const badge = screen.getByText('Responsive Badge');
      expect(badge).toHaveClass('px-2');
      expect(badge).toHaveClass('py-1.5');
      expect(badge).toHaveClass('sm:px-1');
      expect(badge).toHaveClass('sm:py-0.5');
    });
  });

  describe('icon support', () => {
    it('handles SVG icons correctly', () => {
      render(
        <Badge>
          <svg data-testid="test-icon" />
          Badge with Icon
        </Badge>
      );

      const icon = screen.getByTestId('test-icon');
      const badge = screen.getByText('Badge with Icon');

      expect(icon).toBeInTheDocument();
      expect(badge).toHaveClass('[&_svg]:size-4');
    });

    it('maintains correct spacing with icons', () => {
      render(
        <Badge>
          <svg data-testid="test-icon" />
          Badge with Icon
        </Badge>
      );

      const badge = screen
        .getByText('Badge with Icon')
        .closest('[data-slot="badge"]');
      expect(badge).toHaveClass('gap-1.5');
    });
  });

  describe('dark mode support', () => {
    it('has dark mode classes for warn variant', () => {
      render(<Badge variant="warn">Dark Mode Badge</Badge>);

      const badge = screen.getByText('Dark Mode Badge');
      expect(badge).toHaveClass('dark:text-amber-50');
      expect(badge).toHaveClass('dark:bg-amber-950');
      expect(badge).toHaveClass('dark:border-amber-700');
    });

    it('has dark mode classes for error variant', () => {
      render(<Badge variant="error">Dark Mode Badge</Badge>);

      const badge = screen.getByText('Dark Mode Badge');
      expect(badge).toHaveClass('dark:text-red-50');
      expect(badge).toHaveClass('dark:bg-red-950');
      expect(badge).toHaveClass('dark:border-red-700');
    });

    it('has dark mode classes for success variant', () => {
      render(<Badge variant="success">Dark Mode Badge</Badge>);

      const badge = screen.getByText('Dark Mode Badge');
      expect(badge).toHaveClass('dark:text-green-50');
      expect(badge).toHaveClass('dark:bg-green-950');
      expect(badge).toHaveClass('dark:border-green-700');
    });
  });
});
