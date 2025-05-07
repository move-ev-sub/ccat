import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  // Basic rendering and functionality
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-foreground'); // default variant class
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Variants and sizes
  it('applies different variants correctly', () => {
    const { rerender } = render(<Button variant="accent">Accent</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-accent');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-border');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-background-muted');
  });

  // Accessibility
  it('is accessible with keyboard navigation', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');

    // Should be focusable
    button.focus();
    expect(button).toHaveFocus();

    // Should be clickable with Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(button).toHaveFocus();
  });

  it('has proper ARIA attributes', () => {
    render(<Button aria-label="Custom label">Click me</Button>);
    const button = screen.getByRole('button', { name: 'Custom label' });
    expect(button).toBeInTheDocument();
  });

  // Disabled state
  it('handles disabled state correctly', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  // asChild prop
  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('bg-foreground'); // Should inherit button styles
  });

  // Focus styles
  it('applies focus styles correctly', () => {
    render(<Button>Focus me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveClass('focus-indicator');
  });

  // Custom className
  it('merges custom className with default classes', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-foreground'); // Should still have default classes
  });
});
