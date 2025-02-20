import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button data-testid="test-id" onClick={handleClick} />);

    fireEvent.click(screen.getByTestId('test-id'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
