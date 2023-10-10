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
import { debounceTime, delay, map, merge, of, switchMap } from "rxjs";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import {
  CalloutModule,
  FormFieldModule,
  IconButtonModule,
  TypographyModule,
} from "@bitwarden/components";

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
  ],
})
export class ImportLastPassComponent implements OnInit {
  protected isFedereatedSSO = false;

  /** mask password input */
  protected showPassword = false;

  private _parentFormGroup: FormGroup;
  protected formGroup = this.formBuilder.group({
    email: ["", [Validators.required]],
    password: [
      "",
      {
        validators: [Validators.required],
        asyncValidators: [this.validateLastPassCredentials()],
      },
    ],
  });

  private email$ = this.formGroup.controls.email.valueChanges;
  private account$ = this.email$.pipe(
    debounceTime(500),
    switchMap((email) => this.getAccountByEmail(email))
  );
  protected emailHint$ = merge(
    this.email$.pipe(map((email) => (email ? "Finding your account..." : ""))),
    this.account$.pipe(map(() => "Account found. Ready to import."))
  );

  constructor(private formBuilder: FormBuilder, private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this._parentFormGroup = this.controlContainer.control as FormGroup;
    this._parentFormGroup.addControl("lastpassOptions", this.formGroup);
  }

  /** todo */
  private validateLastPassCredentials(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors> => {
      return Promise.resolve({
        badEmailOrPassword: true,
      });
    };
  }

  /** todo */
  private getAccountByEmail(email: string) {
    return of({} as any).pipe(delay(3000));
  }
}
