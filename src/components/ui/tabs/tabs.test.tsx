import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './index';

describe('Tabs', () => {
  const findActivePanel = () => {
    const panels = screen.getAllByRole('tabpanel');
    return panels.find(
      (panel) => panel.getAttribute('data-state') === 'active'
    );
  };

  it('renders tabs with content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    // Check if tabs are rendered
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();

    // Check if content is rendered
    const activePanel = findActivePanel();
    expect(activePanel).toHaveTextContent('Content 1');
    expect(activePanel).toHaveAttribute('data-state', 'active');
  });

  it('switches content when clicking on tabs', async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    // Initially, Content 1 should be active
    expect(findActivePanel()).toHaveTextContent('Content 1');

    // Click Tab 2
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

    // Now Content 2 should be active
    expect(findActivePanel()).toHaveTextContent('Content 2');
  });

  it('applies correct styles to active tab', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
    const inactiveTab = screen.getByRole('tab', { name: 'Tab 2' });

    expect(activeTab).toHaveAttribute('data-state', 'active');
    expect(inactiveTab).toHaveAttribute('data-state', 'inactive');
  });

  it('handles disabled tabs correctly', async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const disabledTab = screen.getByRole('tab', { name: 'Tab 2' });

    expect(disabledTab).toHaveAttribute('data-disabled');
    expect(disabledTab).toBeDisabled();

    // Try to click disabled tab
    await user.click(disabledTab);

    // Content should not change
    expect(findActivePanel()).toHaveTextContent('Content 1');
  });
});
