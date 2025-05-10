'use client';

import { Table } from '@tanstack/react-table';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { ViewOptions } from '../../data-table-view-options';
import { DataTableCheckboxFilter } from '../../filters/data-table-checkbox-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const debouncedSetFilterValue = useDebouncedCallback((value) => {
    table.getColumn('fullName')?.setFilterValue(value);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSetFilterValue(value);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {table.getColumn('fullName')?.getIsVisible() && (
          <Input
            type="search"
            placeholder="Suche nach Namen..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full min-w-32 sm:max-w-[250px] sm:[&>input]:h-[30px]"
          />
        )}
        <ViewOptions table={table} className="w-full sm:w-fit" />
      </div>
      <div className="mt-4 flex w-full flex-col flex-wrap gap-2 sm:w-fit sm:flex-row sm:items-center">
        {table.getColumn('currentDegree')?.getIsVisible() && (
          <DataTableCheckboxFilter
            column={table.getColumn('currentDegree')}
            label="Aktueller Abschluss"
            options={[
              { label: 'Bachelor', value: 'BACHELOR' },
              { label: 'Hochschulreife', value: 'HOCHSCHULREIFE' },
              { label: 'Abitur', value: 'ABITUR' },
            ]}
          />
        )}
        {table.getColumn('targetDegree')?.getIsVisible() && (
          <DataTableCheckboxFilter
            column={table.getColumn('targetDegree')}
            label="Zielabschluss"
            options={[
              { label: 'Bachelor', value: 'BACHELOR' },
              { label: 'Master', value: 'MASTER' },
            ]}
          />
        )}
        {table.getColumn('status')?.getIsVisible() && (
          <DataTableCheckboxFilter
            column={table.getColumn('status')}
            label="Status"
            options={[
              { label: 'Akzeptiert', value: 'ACCEPTED' },
              { label: 'Abgelehnt', value: 'REJECTED' },
              { label: 'Keine Entscheidung', value: 'PENDING' },
            ]}
          />
        )}
        {table.getColumn('priorization')?.getIsVisible() && (
          <DataTableCheckboxFilter
            column={table.getColumn('priorization')}
            label="Priorität"
            options={[
              { label: 'Priorität 1', value: 'PRIO_1' },
              { label: 'Priorität 2', value: 'PRIO_2' },
              { label: 'Priorität 3', value: 'PRIO_3' },
              { label: 'Priorität 4', value: 'PRIO_4' },
              { label: 'Priorität 5', value: 'PRIO_5' },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="text-accent h-9 w-fit"
          >
            <span className="whitespace-nowrap">Filter zurücksetzen</span>
          </Button>
        )}
      </div>
    </>
  );
}
