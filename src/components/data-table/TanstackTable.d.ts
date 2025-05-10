/* eslint @typescript-eslint/no-unused-vars: 0 */

import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    displayName: string;
  }
}
