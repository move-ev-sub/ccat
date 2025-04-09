import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch />);

    const switchElement = screen.getByRole('switch');
    const thumb = screen
      .getByRole('switch')
      .querySelector('[data-state="unchecked"]');

    expect(switchElement).toBeInTheDocument();
    expect(thumb).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('toggles state when clicked', async () => {
    const user = userEvent.setup();
    render(<Switch />);

    const switchElement = screen.getByRole('switch');

    // Initial state
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    // Click the switch
    await user.click(switchElement);

    // Checked state
    expect(switchElement).toHaveAttribute('data-state', 'checked');

    // Click again
    await user.click(switchElement);

    // Back to unchecked state
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('respects defaultChecked prop', () => {
    render(<Switch defaultChecked />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('respects checked prop and onChange handler', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Switch checked={false} onCheckedChange={handleChange} />
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    await userEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledWith(true);

    // Rerender with checked state
    rerender(<Switch checked={true} onCheckedChange={handleChange} />);
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('handles disabled state correctly', async () => {
    const handleChange = vi.fn();
    render(<Switch disabled onCheckedChange={handleChange} />);

    const switchElement = screen.getByRole('switch');

    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveAttribute('data-disabled');

    // Try to click disabled switch
    await userEvent.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Switch className="custom-class" />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('custom-class');
  });

  it('maintains focus styles', async () => {
    const user = userEvent.setup();
    render(<Switch />);

    const switchElement = screen.getByRole('switch');

    // Focus the switch
    await user.tab();

    // Check focus styles
    expect(switchElement).toHaveClass('focus-indicator');
  });

  it('has correct ARIA attributes', () => {
    render(<Switch />);

    const switchElement = screen.getByRole('switch');

    expect(switchElement).toHaveAttribute('role', 'switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });
});
