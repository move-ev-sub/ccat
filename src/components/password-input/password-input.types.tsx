import { z } from 'zod';

export type PasswordCriteria = {
  id: string;
  label: string;
  regex: RegExp;
  zodCheck: (schema: z.ZodString) => z.ZodString;
};

export interface PasswordInputProps
  extends Omit<React.ComponentProps<'input'>, 'value'> {
  criteria: PasswordCriteria[];
  toggalble?: boolean;
  value: string;
}

export interface PasswordInputCriteriaProps
  extends React.ComponentProps<'div'> {
  valid: boolean;
  criterion: PasswordCriteria;
}
