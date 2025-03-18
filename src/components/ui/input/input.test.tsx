import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('renders correctly with default props', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('rounded-lg');
    expect(input).toHaveClass('border');
  });

  it('handles email input type', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('handles password input type', () => {
    render(<Input type="password" data-testid="password-input" />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('handles number input type', () => {
    render(<Input type="number" />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');

    expect(input).toHaveValue('test value');
  });

  it('handles placeholder text', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('handles disabled state', async () => {
    const user = userEvent.setup();
    render(<Input disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50');

    // Try to type in disabled input
    await user.type(input, 'test');
    expect(input).toHaveValue('');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('handles focus states', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');

    // Focus the input
    await user.tab();

    // Check focus styles
    expect(input).toHaveClass('focus-visible:ring-ring');
    expect(input).toHaveClass('focus-visible:ring-1');
    expect(input).toHaveClass('focus-visible:outline-none');
  });

  it('handles file input type', () => {
    render(<Input type="file" data-testid="file-input" />);

    const input = screen.getByTestId('file-input');
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveClass('file:text-foreground');
    expect(input).toHaveClass('file:border-0');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });

  it('handles required attribute', () => {
    render(<Input required />);

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('handles aria attributes', () => {
    render(
      <Input
        aria-label="Username"
        aria-describedby="username-description"
        aria-invalid="true"
      />
    );

    const input = screen.getByRole('textbox', { name: 'Username' });
    expect(input).toHaveAttribute('aria-describedby', 'username-description');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles onChange event', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalled();
  });

  it('handles onBlur event', async () => {
    const handleBlur = vi.fn();
    const user = userEvent.setup();
    render(<Input onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.tab();

    expect(handleBlur).toHaveBeenCalled();
  });
});
