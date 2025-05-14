type Template<T> = (props: T) => React.ReactElement;

export interface SendProps {
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

export interface SendReactEmailProps<T> extends SendProps {
  /**
   * The react-email component to render as the content of the email.
   */
  react: Template<T>;

  /**
   * The props to pass to the react-email component.
   */
  props: T;
}

export type SendEmailProps<T> = Omit<
  SendReactEmailProps<T>,
  'react' | 'subject' | 'from'
>;
