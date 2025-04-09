import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  // Basic rendering and functionality
  it('renders with default props', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass('border-border');
  });

  it('handles checked state changes', async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={handleCheckedChange} />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(handleCheckedChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    expect(checkbox).toHaveClass('data-[state=checked]:bg-accent');
  });

  // Accessibility
  it('is accessible with keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');

    // Should be focusable
    await user.tab();
    expect(checkbox).toHaveFocus();

    // Should be toggleable with Space key
    await user.keyboard(' ');
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('has proper ARIA attributes', () => {
    render(<Checkbox aria-label="Test checkbox" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Test checkbox' });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-label', 'Test checkbox');
  });

  // Disabled state
  it('handles disabled state correctly', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('disabled:opacity-50');
    expect(checkbox).toHaveClass('disabled:cursor-not-allowed');
  });

  // Focus styles
  it('applies focus styles correctly', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    await user.tab();
    expect(checkbox).toHaveClass('focus-indicator');
  });

  // Custom className
  it('merges custom className with default classes', () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-class');
    expect(checkbox).toHaveClass('border-border'); // Should still have default classes
  });

  // Invalid state
  it('handles invalid state correctly', () => {
    render(<Checkbox aria-invalid />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('aria-invalid:ring-destructive/30');
    expect(checkbox).toHaveClass('aria-invalid:border-destructive-border');
  });

  // Checkbox indicator
  it('renders check icon when checked', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    const indicator = checkbox.querySelector(
      '[data-slot="checkbox-indicator"]'
    );
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass('flex items-center justify-center');
  });

  // Controlled vs Uncontrolled
  it('works as a controlled component', async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();
    render(<Checkbox checked={true} onCheckedChange={handleCheckedChange} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('data-state', 'checked');
    await user.click(checkbox);
    expect(handleCheckedChange).toHaveBeenCalledTimes(1);
  });

  it('works as an uncontrolled component', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });
});
