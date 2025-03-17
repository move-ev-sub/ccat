import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass(
      'bg-foreground/10',
      'animate-pulse',
      'rounded-lg'
    );
  });

  it('renders with custom className', () => {
    render(<Skeleton className="custom-class" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('renders with custom dimensions', () => {
    render(<Skeleton className="h-10 w-20" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('h-10', 'w-20');
  });

  it('has correct ARIA attributes', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('data-slot', 'skeleton');
  });

  it('merges custom className with default classes', () => {
    render(<Skeleton className="custom-class" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass(
      'bg-foreground/10',
      'animate-pulse',
      'rounded-lg',
      'custom-class'
    );
  });

  it('handles undefined className', () => {
    render(<Skeleton className={undefined} />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass(
      'bg-foreground/10',
      'animate-pulse',
      'rounded-lg'
    );
  });

  it('preserves additional attributes', () => {
    render(<Skeleton data-testid="test-skeleton" />);
    const skeleton = screen.getByTestId('test-skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('data-testid', 'test-skeleton');
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
  });

  it('renders with custom animation duration', () => {
    render(<Skeleton className="animate-pulse [animation-duration:2s]" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('[animation-duration:2s]');
  });

  it('renders with custom background color', () => {
    render(<Skeleton className="bg-primary" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('bg-primary');
  });

  it('renders with custom border radius', () => {
    render(<Skeleton className="rounded-full" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-full');
  });
});
