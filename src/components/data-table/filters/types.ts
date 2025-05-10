import { Column } from '@tanstack/react-table';

export interface DataTableFilterProps<TData, TValue> {
  column: Column<TData, TValue> | undefined;
  label: string;
}

export type FilterCondition =
  | 'is-equal-to'
  | 'is-between'
  | 'is-greater-than'
  | 'is-less-than';

export type ConditionFilter =
  | {
      condition: FilterCondition;
      value: [number | string, number | string];
    }
  | undefined;
