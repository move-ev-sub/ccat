import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Separator } from './separator';

describe('Separator', () => {
  // Basic rendering and functionality
  it('renders with default props', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('bg-border');
    expect(separator).toHaveClass('h-px');
    expect(separator).toHaveClass('w-full');
  });

  // Orientation tests
  it('renders horizontal separator correctly', () => {
    const { container } = render(<Separator orientation="horizontal" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('h-px');
    expect(separator).toHaveClass('w-full');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders vertical separator correctly', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('h-full');
    expect(separator).toHaveClass('w-px');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });

  // Accessibility
  it('has correct ARIA role when not decorative', () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('role', 'separator');
  });

  it('has role="none" when decorative', () => {
    const { container } = render(<Separator decorative={true} />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute('role', 'none');
  });

  // Custom className
  it('merges custom className with default classes', () => {
    const { container } = render(<Separator className="custom-class" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('custom-class');
    expect(separator).toHaveClass('bg-border'); // Should still have default classes
  });

  // Orientation with custom classes
  it('maintains custom classes while changing orientation', () => {
    const { container, rerender } = render(
      <Separator orientation="horizontal" className="custom-class" />
    );
    let separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('custom-class');
    expect(separator).toHaveClass('h-px');
    expect(separator).toHaveClass('w-full');

    rerender(<Separator orientation="vertical" className="custom-class" />);
    separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('custom-class');
    expect(separator).toHaveClass('h-full');
    expect(separator).toHaveClass('w-px');
  });

  // Default props
  it('uses default props when not specified', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveAttribute('role', 'none'); // Should be decorative by default
  });

  // Semantic meaning
  it('provides semantic separation when not decorative', () => {
    render(
      <div>
        <div>Content before</div>
        <Separator
          decorative={false}
          aria-label="Content separator"
          orientation="horizontal"
        />
        <div>Content after</div>
      </div>
    );

    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-label', 'Content separator');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  // Edge cases
  it('handles undefined className', () => {
    const { container } = render(<Separator className={undefined} />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('bg-border');
  });

  it('preserves additional attributes', () => {
    render(<Separator data-testid="test-separator" aria-hidden="true" />);
    const separator = screen.getByTestId('test-separator');
    expect(separator).toHaveAttribute('aria-hidden', 'true');
  });
});
