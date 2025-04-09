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

    notAuthenticated: () => {
      return `Der Nutzer ist nicht angemeldet.`;
    },

    /**
     * Error message to throw when the user is not an admin
     * @param type Type of the object which could not be fetched
     */
    failedToFetch: (type: string) => {
      return `Fehler beim Abrufen von ${type}.`;
    },
    notAuthorized: () => {
      return `Der Nutzer ist nicht autorisiert.`;
    },
    invalidFileName: () => {
      return `Der Dateiname ist ungültig.`;
    },
    logoUploadFailed: () => {
      return `Das Hochladen des Logos ist fehlgeschlagen.`;
    },
    bucketNotFound: (type: string) => {
      return `Der Bucket "${type}" wurde nicht gefunden.`;
    },
    noUserCreated: () => {
      return `Es wurde kein Benutzer erstellt.`;
    },
    noCompanyCreated: () => {
      return `Es wurde kein Unternehmen erstellt.`;
    },
    eventNotFound: (eventId: string) => {
      return `Das Event mit der ID ${eventId} wurde nicht gefunden.`;
    },
    dateNotInFuture: () => {
      return `Das Datum muss in der Zukunft liegen.`;
    },
    dateBeforeEnddate: () => {
      return `Das Startdatum muss vor dem Enddatum liegen.`;
    },
    updateFailed: (type: string) => {
      return `Das Aktualisieren des ${type} ist fehlgeschlagen.`;
    },
    phaseCheckFailed: () => {
      return `Die Überprüfung, ob eine Phase existiert, ist fehlgeschlagen.`;
    },
    noEventCreated: () => {
      return `Es wurde kein Event erstellt.`;
    },
    eventAlreadyHasPhase: (type: string) => {
      return `Das Event hat bereits eine Phase vom Typ ${type}.`;
    },
    failedToGetUser: () => {
      return `Fehler beim Abrufen des Benutzers.`;
    },
  },
};
