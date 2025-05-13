'use server';

import resend from '@/lib/api/resend';
import { Email } from '@/lib/consts/email';
import { ServiceResult } from '@/types';
import { CreateEmailResponseSuccess } from 'resend';
import ConfirmEmail from '../components/auth/confirm-email';
import ResetPasswordEmail from '../components/auth/reset-password';
import { SendEmailProps, SendReactEmailProps } from '../types';

/**
 * Sends an email using a react-email component as the content of the email. The
 * react-email component is rendered to HTML by resend.
 *
 * @returns The response from resend as a Promise of a ServiceResult
 */
export async function sendReactEmail<T>({
  from = Email.FROM,
  react,
  subject,
  to,
  props,
}: SendReactEmailProps<T>): Promise<ServiceResult<CreateEmailResponseSuccess>> {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    react: react(props),
  });

  if (!data || error) {
    return {
      ok: false,
      error:
        error?.message ?? 'An unknown error occurred while sending the email.',
    };
  }

  return {
    ok: true,
    data,
  };
}

/**
 * Sends a confirmation email to the user to confirm their email address.
 *
 * @see {@link ConfirmEmail}
 *
 * @param props - The props to pass to the {@link ConfirmEmail} component.
 */
export async function sendConfirmEmail({
  ...props
}: SendEmailProps<React.ComponentProps<typeof ConfirmEmail>>): Promise<
  ServiceResult<CreateEmailResponseSuccess>
> {
  return sendReactEmail({
    subject: 'Bestätige deine E-Mail-Adresse um dein Konto zu aktivieren',
    react: ConfirmEmail,
    ...props,
  });
}

/**
 * Sends a reset password email to the user to reset their password.
 *
 * @see {@link ResetPasswordEmail}
 */
export async function sendResetPasswordEmail({
  ...props
}: SendEmailProps<React.ComponentProps<typeof ResetPasswordEmail>>): Promise<
  ServiceResult<CreateEmailResponseSuccess>
> {
  return sendReactEmail({
    subject: 'Setze dein Passwort zurück',
    react: ResetPasswordEmail,
    ...props,
  });
}
