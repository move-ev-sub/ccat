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
     * email address could not be found.
     *
     * @param email Email of the user
     */
    userNotFound: (email: string) => {
      return `Kein Benutzer mit der E-Mail ${email} gefunden.`;
    },

    /**
     * Generic error message to throw when no user could be found.
     */
    userNotFoundGeneric: () => {
      return `Kein Benutzer gefunden.`;
    },

    /**
     * Error message to throw when the user is not authenticated.
     */
    notAuthenticated: () => {
      return `Der Nutzer ist nicht angemeldet.`;
    },

    /**
     * Error message to throw when the user is not authorized to perform an action.
     */
    notAuthorized: () => {
      return `Der Nutzer ist nicht autorisiert.`;
    },

    /**
     * Error message to throw when the user is not an admin.
     */
    noAdmin: () => {
      return `Der Nutzer ist kein Admin.`;
    },

    /**
     * Error message to throw when a bucket with the given type could not be found.
     *
     * @param type Type of the bucket
     */
    bucketNotFound: (type: string) => {
      return `Der Bucket "${type}" wurde nicht gefunden.`;
    },

    /**
     * Error message to throw when an event with the given ID could not be found.
     *
     * @param eventId ID of the event
     */
    eventNotFound: (eventId: string) => {
      return `Das Event mit der ID ${eventId} wurde nicht gefunden.`;
    },

    /**
     * Error message to throw when fetching a resource fails.
     *
     * @param type Type of the resource
     */
    failedToFetch: (type: string) => {
      return `Fehler beim Abrufen von ${type}.`;
    },

    /**
     * Error message to throw when a resource of the given type could not be created.
     *
     * @param type Type of the resource
     */
    notCreated: (type: string) => {
      return `Es wurde kein ${type} erstellt.`;
    },

    /**
     * Error message to throw when a date is not in the future.
     */
    dateNotInFuture: () => {
      return `Das Datum muss in der Zukunft liegen.`;
    },

    /**
     * Error message to throw when the start date is after the end date.
     */
    dateBeforeEnddate: () => {
      return `Das Startdatum muss vor dem Enddatum liegen.`;
    },

    /**
     * Error message to throw when the start date and end date are not on the same day.
     */
    notSameDay: () => {
      return `Das Startdatum und das Enddatum müssen am selben Tag liegen.`;
    },

    /**
     * Error message to throw when updating a resource of the given type fails.
     *
     * @param type Type of the resource
     */
    updateFailed: (type: string) => {
      return `Das Aktualisieren des ${type} ist fehlgeschlagen.`;
    },

    /**
     * Error message to throw when checking for a phase fails.
     */
    phaseCheckFailed: () => {
      return `Die Überprüfung, ob eine Phase existiert, ist fehlgeschlagen.`;
    },

    /**
     * Error message to throw when uploading a logo fails.
     */
    logoUploadFailed: () => {
      return `Das Hochladen des Logos ist fehlgeschlagen.`;
    },

    /**
     * Error message to throw when creating a resource of the given type fails.
     *
     * @param type Type of the resource
     */
    failedToCreate: (type: string) => {
      return `Fehler beim Erstellen des ${type}.`;
    },

    /**
     * Error message to throw when fetching a resource of the given type fails.
     *
     * @param type Type of the resource
     */
    failedToGet: (type: string) => {
      return `Fehler beim Abrufen des ${type}.`;
    },

    /**
     * Error message to throw when the given event ID is not a valid UUID.
     *
     * @param eventId ID of the event
     */
    invalidUUID: (eventId: string) => {
      return `Die Event ID ${eventId} ist eine ungültige UUID.`;
    },

    /**
     * Error message to throw when at least one of the provided IDs is not a valid UUID.
     */
    nInvalidUUID: () => {
      return `Mindestens eine der IDs ist eine ungültige UUID.`;
    },

    /**
     * Error message to throw when the file name is invalid.
     */
    invalidFileName: () => {
      return `Der Dateiname ist ungültig.`;
    },

    /**
     * Error message to throw when a bucket with the given name does not exist.
     *
     * @param name Name of the bucket
     */
    bucketDoesNotExist: (name: string) => {
      return `Der Bucket "${name}" existiert nicht.`;
    },

    /**
     * Error message to throw when uploading a file to a bucket fails.
     *
     * @param name Name of the bucket
     * @param fileName Name of the file
     */
    uploadToBucketFailed: (name: string, fileName: string) => {
      return `Das Hochladen der Datei "${fileName}" in den Bucket "${name}" ist fehlgeschlagen.`;
    },

    /**
     * Error message to throw when the maximum number of participants is not positive.
     */
    maxParticipantsNotPositive: () => {
      return 'Maximale Teilnehmerzahl muss positiv sein.';
    },

    /**
     * Error message to throw when an event already has a phase of the given type.
     *
     * @param type Type of the phase
     */
    eventAlreadyHasPhase: (type: string) => {
      return `Das Event hat bereits eine Phase vom Typ ${type}.`;
    },
  },
  /**
   * The errors object contains all the error messages which are used in the app.
   */
  pages: {
    /**
     * The dashboard object contains all the messages which are used in the dashboard.
     */

    dashboard: {
      title: () => {
        return `Dashboard`;
      },

      description: () => {
        return `Hier ist eine Übersicht über alle Veranstaltungen und Unterveranstaltungen.`;
      },
    },
    /**
     * The events object contains all the messages which are used in the events.
     */
    events: {
      title: () => {
        return `Veranstaltungen`;
      },
      description: () => {
        return `Hier kannst du alle Veranstaltungen einsehen, bearbeiten und neue erstellen. Klicke auf eine Veranstaltung, um mehr Informationen zu erhalten.`;
      },
      createEvent: () => {
        return `Neu erstellen`;
      },
      allEvents: () => {
        return 'Alle';
      },
      publishedEvents: () => {
        return 'Veröffentlicht';
      },
      draftEvents: () => {
        return 'Entwürfe';
      },
    },
    /**
     * The user-settings object contains all the messages which are used in the user-settings.
     */
    userSettings: {
      title: () => {
        return `Nutzerverwaltung`;
      },
      description: () => {
        return `Hier kannst du alle Benutzer verwalten. Beachte, dass hier alle Benutzer angezeigt werden, sowohl Bewerber:innnen als auch Unternehmen.`;
      },
    },
    /**
     * The company-settings object contains all the messages which are used in the company-settings.
     */
    companySettings: {
      title: () => {
        return `Unternehmen`;
      },
      description: () => {
        return `Hier kannst du Partnerunternehmen hinzufügen, bearbeiten und löschen.`;
      },
      newCompany: () => {
        return `Neues Unternehmen`;
      },
      noCompanies: () => {
        return `Keine Unternehmen gefunden`;
      },
      noCompaniesDesc: () => {
        return `Klicke auf "Neues Unternehmen", um ein neues Unternehmen hinzuzufügen.`;
      },
    },
    /**
     * The new-company object contains all the messages which are used in the new-company.
     */
    newCompany: {
      title: () => {
        return `Neues Unternehmen`;
      },
      description: () => {
        return `Füge ein neuen Unternehmen hinzu um diesem anschließend Veranstaltungen zuzuweisen.`;
      },
    },
    /**
     * The new-event object contains all the messages which are used in the new-event.
     */
    newEvent: {
      title: () => {
        return `Neue Veranstaltung`;
      },
      describtion: () => {
        return `Du kannst eine ganz neue Veranstaltung erstellen oder eine bestehende
        Veranstaltung kopieren.`;
      },
      createNew: () => {
        return `Neue Veranstaltung`;
      },
      createNewDescribtion: () => {
        return `Erstelle eine neue Veranstaltung von Grund auf.`;
      },
      copy: () => {
        return `Veranstaltung kopieren`;
      },
      copyDescribtion: () => {
        return `Starte mit einer bestehenden Veranstaltung als Vorlage.`;
      },
    },
    /**
     * The new-subevent object contains all the messages which are used in the new-sub-event.
     */
    newSubEvent: {
      title: () => {
        return `Neue Unter-Veranstaltung erstellen`;
      },
      description: () => {
        return `Um eine Unter-Veranstaltung zu erstellen, wählen Sie bitte ein Unternehmen und einen Slot aus.`;
      },
    },
    /**
     * The register object contains all the messages which are used in the register.
     */

    register: {
      description: () => {
        return `Erstelle einen Account um Bewerbungen einzureichen.`;
      },
      alreadyHaveAccount: () => {
        return `Du hast bereits einen Account?`;
      },
      login: () => {
        return `Anmelden`;
      },
    },
    /**
     * The login object contains all the messages which are used in the login.
     */
    login: {
      title: () => {
        return `Anmeldung`;
      },
      description: () => {
        return `Melde dich an um auf das CCAT zuzugreifen.`;
      },
      noAccount: () => {
        return `Du hast noch keinen Account?`;
      },
      register: () => {
        return `Registrieren`;
      },
    },
    adminEventOverview: {
      description: () => {
        return `Ein Überblick über die Veranstaltung. Hier kannst du alle Bewerbungen einsehen, bearbeiten und neue erstellen.`;
      },
      applicationsTitle: () => {
        return `Bewerbungen`;
      },
      applicationsDescription: () => {
        return `Seit Beginn`;
      },
      createEvent: () => {
        return `Neu erstellen`;
      },
    },
    notFound: {
      title: () => {
        return `Seite nicht gefunden`;
      },
      description: () => {
        return `Hier kannst du dich leider nicht bewerben.`;
      },
      goHome: () => {
        return `Zurück zur Startseite`;
      },
    },
    error: {
      title: () => {
        return `Uups! Etwas ist schiefgelaufen.`;
      },
      goHome: () => {
        return `Zurück zur Startseite`;
      },
      tryAgain: () => {
        return `Erneut versuchen`;
      },
    },
  },
};
