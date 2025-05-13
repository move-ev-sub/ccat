'use server';

import ConfirmEmail from '@/emails/auth/confirm-email';
import ResetPasswordEmail from '@/emails/auth/reset-password';
import ApplicationConfirmEmail from '@/emails/transactional/application-confirm';
import { Email } from '@/utils/consts';
import React from 'react';
import { CreateEmailResponseSuccess, Resend } from 'resend';
import { ServiceResult } from '../types/serviceResult';

const resend = new Resend(process.env.RESEND_API_KEY);

type Template<T> = (props: T) => React.ReactElement;

interface SendProps {
  /**
   * The subject of the email.
   */
  subject: string;

  /**
   * The email address of the sender.
   *
   * @default 'move - studentische Unternehmensberatung e.V. <donotreply@transactional.consultingcontact.de>'
   */
  from?: string;

  /**
   * Email addresses of the recipients. These can be a single email address or an array
   * of email addresses. The array can contain up to 50 email addresses.
   *
   * @maxItems 50
   */
  to: string | string[];
}

interface SendReactEmailProps<T> extends SendProps {
  /**
   * The react-email component to render as the content of the email.
   */
  react: Template<T>;

  /**
   * The props to pass to the react-email component.
   */
  props: T;
}

type SendEmailProps<T> = Omit<
  SendReactEmailProps<T>,
  'react' | 'subject' | 'from'
>;

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
 * Sends and application confirmation email to the applicant with a list of
 * all sub-events they have applied to.
 *
 * @see {@link ApplicationConfirmEmail}
 *
 * @param props - The props to pass to the {@link ApplicationConfirmEmail} component.
 * @returns The response from resend as a Promise of a ServiceResult
 */
export async function sendApplicationConfirmMail({
  ...props
}: SendEmailProps<
  React.ComponentProps<typeof ApplicationConfirmEmail>
>): Promise<ServiceResult<CreateEmailResponseSuccess>> {
  return sendReactEmail({
    subject: 'Bewerbung erfolgreich abgeschickt',
    react: ApplicationConfirmEmail,
    ...props,
  });
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
