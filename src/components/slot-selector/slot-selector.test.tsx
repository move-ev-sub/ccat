import { Slot } from '@prisma/client';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SlotSelector } from './slot-selector';

describe('SlotSelector', () => {
  afterEach(() => {
    cleanup();
  });

  const mockSlots: Slot[] = [
    {
      id: '1',
      startDate: new Date('2024-03-20T10:00:00'),
      endDate: new Date('2024-03-20T11:00:00'),
      eventId: 'event1',
      createdAt: new Date(),
      createdById: 'user1',
    },
    {
      id: '2',
      startDate: new Date('2024-03-20T14:00:00'),
      endDate: new Date('2024-03-20T15:00:00'),
      eventId: 'event1',
      createdAt: new Date(),
      createdById: 'user1',
    },
    {
      id: '3',
      startDate: new Date('2024-03-21T09:00:00'),
      endDate: new Date('2024-03-21T10:00:00'),
      eventId: 'event1',
      createdAt: new Date(),
      createdById: 'user1',
    },
  ];

  it('renders and displays slots grouped by date', async () => {
    const user = userEvent.setup();
    render(<SlotSelector slots={mockSlots} value={null} onChange={() => {}} />);

    // Check if dates are displayed correctly
    expect(screen.getByText('20.03.2024')).toBeInTheDocument();
    expect(screen.getByText('21.03.2024')).toBeInTheDocument();

    // Check if time slots for the first date are displayed correctly
    expect(screen.getByText('10:00 - 11:00')).toBeInTheDocument();
    expect(screen.getByText('14:00 - 15:00')).toBeInTheDocument();

    // Click on the second date tab to see its time slots
    const secondDateTab = screen.getByRole('tab', { name: '21.03.2024' });
    await user.click(secondDateTab);

    // Check if time slot for the second date is displayed
    expect(screen.getByText('09:00 - 10:00')).toBeInTheDocument();

    // Check if "Kein Slot ausgewählt" is displayed initially
    expect(screen.getByText('Kein Slot ausgewählt')).toBeInTheDocument();
  });

  it('selects a slot and displays its details', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SlotSelector slots={mockSlots} value={null} onChange={onChange} />);

    // Click on a time slot
    const timeSlot = screen.getByRole('button', { name: '10:00 - 11:00' });
    await user.click(timeSlot);

    // Check if onChange was called with the correct slot ID
    expect(onChange).toHaveBeenCalledWith('1');

    // Check if the correct slot details are displayed
    expect(screen.getByText('20.03.2024')).toBeInTheDocument();
    expect(screen.getByText('Mittwoch')).toBeInTheDocument();
  });

  it('updates selected slot when value prop changes', () => {
    const { rerender } = render(
      <SlotSelector slots={mockSlots} value={null} onChange={() => {}} />
    );

    // Initially no slot should be selected
    expect(screen.getByText('Kein Slot ausgewählt')).toBeInTheDocument();

    // Update the value prop to select a slot
    rerender(<SlotSelector slots={mockSlots} value="1" onChange={() => {}} />);

    // Check if the correct slot details are displayed
    expect(screen.getByText('20.03.2024')).toBeInTheDocument();
    expect(screen.getByText('Mittwoch')).toBeInTheDocument();
  });
});
