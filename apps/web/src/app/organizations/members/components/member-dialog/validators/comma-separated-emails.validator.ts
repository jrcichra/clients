import { AbstractControl, ValidationErrors } from "@angular/forms";

import { emailAllowingDiacritics } from "@bitwarden/angular/validators/email-allow-diacritics.validator";

function validateEmails(emails: string) {
  return (
    emails
      .split(",")
      .map((email) => emailAllowingDiacritics(<AbstractControl>{ value: email.trim() }))
      .find((_) => _ !== null) === undefined
  );
}

export function commaSeparatedEmails(control: AbstractControl): ValidationErrors | null {
  if (control.value === "" || !control.value || validateEmails(control.value)) {
    return null;
  }
  return { multipleEmails: { message: "multipleInputEmails" } };
}
