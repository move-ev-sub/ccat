/**
 * The messages object contains all the messages which are used in the app.
 * We use an object to store messages since it makes it easier to customize
 * messages based on the provided context. A "message" is a function which
 * takes a variable number of arguments and returns a string.
 *
 * @example
 * ```ts
 * import { messages as t } from "@/lib/i18n";
 *
 * console.log(t.errors.userNotFound("test1@gmail.com"));
 * ```
 */
export const messages = {
  /**
   * The errors object contains all the error messages which are used in the app.
   */
  errors: {
    /**
     * Error message to throw when the user object for a given
     * email adress could not been found
     *
     * @param email Email of the user
     */
    userNotFound: (email: string) => {
      return `Kein Benutzer mit der E-Mail ${email} gefunden.`;
    },
  },
};
