import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './label';

describe('Button', () => {
  it('renders children', () => {
    render(<Label data-testid="test-id">Test</Label>);

    expect(document.querySelector('[data-slot="label"]')?.textContent).toBe(
      'Test'
    );
  });
});
