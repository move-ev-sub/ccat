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
        {table.getColumn('role')?.getIsVisible() && (
          <DataTableCheckboxFilter
            column={table.getColumn('role')}
            label="Rolle"
            options={[
              { label: 'Benutzer', value: 'user' },
              { label: 'Unternehmen', value: 'company' },
              { label: 'Administrator', value: 'admin' },
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
