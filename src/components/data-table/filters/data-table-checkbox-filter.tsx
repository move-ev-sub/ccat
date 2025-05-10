'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent } from '@/components/ui/popover';
import React from 'react';
import { DataTableFilterTrigger } from './data-table-filter-trigger';
import { DataTableFilterProps } from './types';

type FilterValues = string[];

interface DataTableCheckboxFilterProps<TData, TValue>
  extends DataTableFilterProps<TData, TValue> {
  options: {
    label: string;
    value: string;
  }[];
}

export function DataTableCheckboxFilter<TData, TValue>({
  column,
  label,
  options,
}: DataTableCheckboxFilterProps<TData, TValue>) {
  const columnFilters = column?.getFilterValue() as FilterValues;
  const isFiltered = column?.getIsFiltered();

  const [selectedValues, setSelectedValues] = React.useState<FilterValues>(
    columnFilters || []
  );
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setSelectedValues(columnFilters);
  }, [columnFilters]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    column?.setFilterValue(selectedValues);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedValues([]);
    column?.setFilterValue([]);
    setIsOpen(false);
  };

  if (!column) return null;

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <DataTableFilterTrigger
          filterLength={columnFilters?.length || 0}
          label={label}
        />
        <PopoverContent className="w-fit max-w-[200px] min-w-48">
          <form onSubmit={handleSubmit} className="space-y-3">
            <ul className="space-y-2">
              {options.map((option, index) => (
                <li
                  key={option.value}
                  className="flex items-center justify-start gap-2"
                >
                  <Checkbox
                    id={`${option.value}-${index}-checkbox`}
                    checked={(selectedValues as string[])?.includes(
                      option.value
                    )}
                    onCheckedChange={(checked) => {
                      setSelectedValues((prev) => {
                        if (checked) {
                          return prev
                            ? [...(prev as string[]), option.value]
                            : [option.value];
                        } else {
                          return (prev as string[]).filter(
                            (value) => value !== option.value
                          );
                        }
                      });
                    }}
                  />
                  <Label htmlFor={`${option.value}-${index}-checkbox`}>
                    {option.label}
                  </Label>
                </li>
              ))}
            </ul>
            <Button variant={'accent'} className="h-7 w-full">
              Anwenden
            </Button>
            {isFiltered && (
              <Button
                variant={'outline'}
                className="h-7 w-full"
                onClick={handleReset}
              >
                Zurücksetzen
              </Button>
            )}
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
