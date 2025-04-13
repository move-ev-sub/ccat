import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Card } from './card';
import { CardContent } from './card-content';
import { CardFooter } from './card-footer';
import { CardHeader } from './card-header';
import { CardLink } from './card-link';
import { CardTitle } from './card-title';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders correctly with default props', () => {
      render(<Card>Card Content</Card>);

      const card = screen.getByText('Card Content');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('data-slot', 'card');
      expect(card).toHaveClass('bg-background');
      expect(card).toHaveClass('border');
    });

    it('applies custom className', () => {
      render(<Card className="custom-class">Card Content</Card>);

      const card = screen.getByText('Card Content');
      expect(card).toHaveClass('custom-class');
    });

    it('renders as a different element when asChild is true', () => {
      render(
        <Card asChild>
          <button>Card Button</button>
        </Card>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-slot', 'card');
      expect(button).toHaveClass('bg-background');
    });
  });

  describe('CardHeader', () => {
    it('renders correctly', () => {
      render(<CardHeader>Header Content</CardHeader>);

      const header = screen.getByText('Header Content');
      expect(header).toHaveAttribute('data-slot', 'card-header');
      expect(header).toHaveClass('bg-background-muted');
      expect(header).toHaveClass('border-b');
    });

    it('applies custom className', () => {
      render(<CardHeader className="custom-header">Header Content</CardHeader>);

      const header = screen.getByText('Header Content');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('CardContent', () => {
    it('renders correctly', () => {
      render(<CardContent>Content</CardContent>);

      const content = screen.getByText('Content');
      expect(content).toHaveAttribute('data-slot', 'card-content');
      expect(content).toHaveClass('p-6');
    });

    it('applies custom className', () => {
      render(<CardContent className="custom-content">Content</CardContent>);

      const content = screen.getByText('Content');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('CardFooter', () => {
    it('renders correctly', () => {
      render(<CardFooter>Footer Content</CardFooter>);

      const footer = screen.getByText('Footer Content');
      expect(footer).toHaveAttribute('data-slot', 'card-footer');
      expect(footer).toHaveClass('bg-background-muted');
      expect(footer).toHaveClass('border-t');
    });

    it('applies custom className', () => {
      render(<CardFooter className="custom-footer">Footer Content</CardFooter>);

      const footer = screen.getByText('Footer Content');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('CardTitle', () => {
    it('renders correctly', () => {
      render(<CardTitle>Card Title</CardTitle>);

      const title = screen.getByText('Card Title');
      expect(title).toHaveAttribute('data-slot', 'card-title');
      expect(title).toHaveClass('text-foreground');
      expect(title).toHaveClass('font-medium');
    });

    it('applies custom className', () => {
      render(<CardTitle className="custom-title">Card Title</CardTitle>);

      const title = screen.getByText('Card Title');
      expect(title).toHaveClass('custom-title');
    });

    it('has correct heading level', () => {
      render(<CardTitle>Card Title</CardTitle>);

      const title = screen.getByRole('heading', { level: 4 });
      expect(title).toBeInTheDocument();
    });
  });

  describe('CardLink', () => {
    it('renders correctly', () => {
      render(<CardLink href="/test">Link Text</CardLink>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('data-slot', 'card-link');
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('text-foreground');
    });

    it('applies custom className', () => {
      render(
        <CardLink href="/test" className="custom-link">
          Link Text
        </CardLink>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-link');
    });

    it('has correct focus styles', async () => {
      const user = userEvent.setup();
      render(<CardLink href="/test">Link Text</CardLink>);

      const link = screen.getByRole('link');

      // Focus the link
      await user.tab();

      expect(link).toHaveClass('focus-indicator');
    });

    it('renders with absolute positioned span for click area', () => {
      render(<CardLink href="/test">Link Text</CardLink>);

      const spans = screen.getAllByRole('generic');
      const clickArea = spans.find(
        (span) =>
          span.className.includes('absolute') &&
          span.className.includes('inset-0') &&
          span.className.includes('z-10')
      );

      expect(clickArea).toBeInTheDocument();
      expect(clickArea).toHaveClass('absolute');
      expect(clickArea).toHaveClass('inset-0');
      expect(clickArea).toHaveClass('z-10');
    });
  });

  describe('Card Integration', () => {
    it('renders full card structure correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      );

      expect(screen.getByRole('heading')).toHaveTextContent('Card Title');
      expect(screen.getByText('Card Content')).toBeInTheDocument();
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
    });

    it('renders card with link correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            Card Content
            <CardLink href="/test">Learn More</CardLink>
          </CardContent>
        </Card>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/test');
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('maintains proper nesting and styling', () => {
      render(
        <Card className="test-card">
          <CardHeader className="test-header">
            <CardTitle className="test-title">Title</CardTitle>
          </CardHeader>
          <CardContent className="test-content">Content</CardContent>
          <CardFooter className="test-footer">Footer</CardFooter>
        </Card>
      );

      const card = screen.getByText('Title').closest('[data-slot="card"]');
      const header = screen
        .getByText('Title')
        .closest('[data-slot="card-header"]');
      const title = screen.getByText('Title');
      const content = screen.getByText('Content');
      const footer = screen.getByText('Footer');

      expect(card).toHaveClass('test-card');
      expect(header).toHaveClass('test-header');
      expect(title).toHaveClass('test-title');
      expect(content).toHaveClass('test-content');
      expect(footer).toHaveClass('test-footer');
    });
  });
});
