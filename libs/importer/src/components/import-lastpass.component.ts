import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
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
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  share,
  switchMap,
  takeUntil,
} from "rxjs";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import { TokenService } from "@bitwarden/common/auth/abstractions/token.service";
import { CryptoFunctionService } from "@bitwarden/common/platform/abstractions/crypto-function.service";
import {
  CalloutModule,
  CheckboxModule,
  FormFieldModule,
  IconButtonModule,
  TypographyModule,
} from "@bitwarden/components";

import { Vault } from "../importers/lastpass/access/vault";

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
export class ImportLastPassComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  /** mask password input */
  protected showPassword = false;

  private _parentFormGroup: FormGroup;
  protected formGroup = this.formBuilder.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.validateEmailField()],
        updateOn: "change",
      },
    ],
    password: [
      "",
      {
        validators: [Validators.required],
        asyncValidators: [this.validatePasswordField()],
        updateOn: "submit",
      },
    ],
    includeSharedFolders: [],
  });

  private vault: Vault;

  private password$ = this.formGroup.controls.password.valueChanges;

  private email$ = this.formGroup.controls.email.valueChanges.pipe(distinctUntilChanged());
  protected emailHint$ = this.formGroup.controls.email.statusChanges.pipe(
    map((status) => {
      if (status === "PENDING") {
        return "Finding your account...";
      }
      if (status === "VALID") {
        return "Account found. Ready to import.";
      }
    })
  );

  private userType$ = this.email$.pipe(
    debounceTime(4000),
    switchMap((email) => this.getUserTypeByEmail(email)),
    share()
  );
  protected isFederatedSSO$ = this.userType$.pipe(map((userType) => userType?.isFederated()));

  @Output() csvDataLoaded = new EventEmitter<string>();

  constructor(
    tokenService: TokenService,
    cryptoFunctionService: CryptoFunctionService,
    private formBuilder: FormBuilder,
    private controlContainer: ControlContainer
  ) {
    this.vault = new Vault(cryptoFunctionService, tokenService);
  }

  ngOnInit(): void {
    this._parentFormGroup = this.controlContainer.control as FormGroup;
    this._parentFormGroup.addControl("lastpassOptions", this.formGroup);

    const _formIsValid$ = this.formGroup.statusChanges.pipe(filter((status) => status === "VALID"));
    combineLatest([this.email$, this.password$, this.userType$, _formIsValid$])
      .pipe(
        switchMap(async ([email, password, userType]) =>
          this.loadCSVData(email, password, userType)
        ),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private async loadCSVData(email: string, password: string, userType: any) {
    /** MP */
    if (userType.type === 0) {
      // this.vault.open(email, password)
    }

    /** Federated */
    if (userType.type === 3) {
      // this.vault.openFederated()
    }

    const csvData = `dummy data ${email} ${password} ${JSON.stringify(userType)}`;
    // eslint-disable-next-line no-console
    console.log(csvData);
    this.csvDataLoaded.emit(csvData);
  }

  /**
   * @param email Email of the account to find
   * @returns Returns the UserType if it exists, otherwise returns `null`
   */
  private async getUserTypeByEmail(email: string) {
    try {
      await this.vault.setUserTypeContext(email);
      return this.vault.userType;
    } catch {
      return null;
    }
  }

  /**
   * TODO:
   *
   * Give user feedback if the LP password + email combo is incorrect
   */
  private validatePasswordField(): AsyncValidatorFn {
    const errors: ValidationErrors = {
      badEmailOrPassword: {
        message: "Incorrect email or password",
      },
    };
    return (_control: AbstractControl): Promise<ValidationErrors> => {
      // return null if password is valid, else return errors. See `validateEmailField`
      return Promise.resolve(errors);
    };
  }

  private validateEmailField(): AsyncValidatorFn {
    const errors: ValidationErrors = {
      accountNotFound: {
        message: "Cannot retrieve account",
      },
    };

    return () =>
      firstValueFrom(this.userType$).then((account) => {
        if (account === null) {
          this.formGroup.controls.email.markAsTouched();
          return errors;
        }
        return null;
      });
  }
}
