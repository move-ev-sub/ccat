import { z } from 'zod';

export type PasswordCriteria = {
  id: string;
  label: string;
  regex: RegExp;
  zodCheck: (schema: z.ZodString) => z.ZodString;
};
export interface PasswordInputProps extends React.ComponentProps<'input'> {
  toggalble?: boolean;
}
