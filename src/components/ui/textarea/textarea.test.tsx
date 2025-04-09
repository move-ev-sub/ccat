import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  // Basic rendering and functionality
  it('renders with default props', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('data-slot', 'textarea');
  });

  it('handles text input correctly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');

    await user.type(textarea, 'Hello, World!');
    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('Hello, World!');
  });

  // Accessibility
  it('is accessible with keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');

    // Should be focusable
    await user.tab();
    expect(textarea).toHaveFocus();

    // Should handle keyboard input
    await user.keyboard('Test');
    expect(textarea).toHaveValue('Test');
  });

  it('has proper ARIA attributes', () => {
    render(
      <Textarea
        aria-label="Test textarea"
        aria-describedby="description"
        aria-invalid={true}
      />
    );
    const textarea = screen.getByRole('textbox', { name: 'Test textarea' });
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-label', 'Test textarea');
    expect(textarea).toHaveAttribute('aria-describedby', 'description');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  // Disabled state
  it('handles disabled state correctly', async () => {
    const user = userEvent.setup();
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:opacity-50');
    expect(textarea).toHaveClass('disabled:cursor-not-allowed');

    // Ensure we can't type when disabled
    await user.type(textarea, 'test');
    expect(textarea).toHaveValue('');
  });

  // Focus styles
  it('applies focus styles correctly', async () => {
    const user = userEvent.setup();
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');

    await user.tab();
    expect(textarea).toHaveClass('focus-indicator');
  });

  // Placeholder
  it('displays placeholder text correctly', () => {
    render(<Textarea placeholder="Enter your message" />);
    const textarea = screen.getByPlaceholderText('Enter your message');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'Enter your message');
  });

  // Custom className
  it('merges custom className with default classes', () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
    expect(textarea).toHaveClass('border-border'); // Should still have default classes
  });

  // Resizing and minimum height
  it('has correct minimum height', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('min-h-24');
  });

  // Value handling
  it('handles controlled value correctly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { rerender } = render(
      <Textarea value="Initial value" onChange={handleChange} />
    );
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveValue('Initial value');

    // Update the value prop
    rerender(<Textarea value="Updated value" onChange={handleChange} />);
    expect(textarea).toHaveValue('Updated value');

    // Try typing
    await user.type(textarea, '!');
    expect(handleChange).toHaveBeenCalled();
  });

  // Default value
  it('handles defaultValue correctly', () => {
    render(<Textarea defaultValue="Default text" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Default text');
  });

  // Required state
  it('handles required state correctly', () => {
    render(<Textarea required />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeRequired();
  });

  // Read-only state
  it('handles readOnly state correctly', async () => {
    const user = userEvent.setup();
    render(<Textarea readOnly defaultValue="Read only content" />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('readonly');

    // Ensure we can't modify the content
    await user.type(textarea, 'test');
    expect(textarea).toHaveValue('Read only content');
  });
});
