import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  ControlContainer,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { debounceTime, delay, firstValueFrom, map, merge, of, switchMap } from "rxjs";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import {
  CalloutModule,
  CheckboxModule,
  FormFieldModule,
  IconButtonModule,
  TypographyModule,
} from "@bitwarden/components";

/** TODO: add I18n */
@Component({
  selector: "import-lastpass",
  templateUrl: "import-lastpass.component.html",
  standalone: true,
  imports: [
    CommonModule,
    JslibModule,
    CalloutModule,
    TypographyModule,
    FormFieldModule,
    ReactiveFormsModule,
    IconButtonModule,
    CheckboxModule,
  ],
})
export class ImportLastPassComponent implements OnInit {
  /** TODO: always false */
  protected isFedereatedSSO = false;

  /** mask password input */
  protected showPassword = false;

  private _parentFormGroup: FormGroup;
  protected formGroup = this.formBuilder.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.validateAccount()],
      },
    ],
    password: [
      "",
      {
        validators: [Validators.required],
        asyncValidators: [this.validateLastPassCredentials()],
        updateOn: "submit",
      },
    ],
    includeSharedFolders: [],
  });

  private email$ = this.formGroup.controls.email.valueChanges;
  private account$ = this.email$.pipe(
    /** TODO: I picked a random debounce time */
    debounceTime(1500),
    switchMap((email) => this.getAccountByEmail(email))
  );
  protected emailHint$ = merge(
    this.email$.pipe(map((email) => (email ? "Finding your account..." : ""))),
    this.account$.pipe(map((account) => (account ? "Account found. Ready to import." : "")))
  );

  constructor(private formBuilder: FormBuilder, private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this._parentFormGroup = this.controlContainer.control as FormGroup;
    this._parentFormGroup.addControl("lastpassOptions", this.formGroup);
  }

  /**
   * TODO:
   *
   * Give user feedback if the LP password + email combo is incorrect
   */
  private validateLastPassCredentials(): AsyncValidatorFn {
    return (_control: AbstractControl): Promise<ValidationErrors> => {
      return Promise.resolve({
        badEmailOrPassword: {
          message: "Incorrect email or password",
        },
      });
    };
  }

  /** Gives user feedback if the LP account is found */
  private validateAccount(): AsyncValidatorFn {
    const errors: ValidationErrors = {
      accountNotFound: {
        message: "Account not found",
      },
    };

    return () =>
      firstValueFrom(this.account$).then((account) => {
        if (account === null) {
          /** We have to manually mark the form as touched because AsyncValidators only run on `blur`, regardless of `updateOn` */
          this.formGroup.controls.email.markAsTouched();
          return errors;
        }
        return null;
      });
  }

  /**
   * TODO:
   * @param email Email of the account to find
   * @returns Returns the account data if it exists, otherwise returns `null`
   */
  private getAccountByEmail(email: string) {
    return of(email).pipe(
      delay(500),
      map(() => {
        if (email === "foo@bar.com") {
          return { name: "Foobar", email };
        }
        return null;
      })
    );
  }
}
