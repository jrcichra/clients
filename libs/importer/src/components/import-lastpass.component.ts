import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AsyncValidatorFn,
  ControlContainer,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { map } from "rxjs";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import { TokenService } from "@bitwarden/common/auth/abstractions/token.service";
import { CryptoFunctionService } from "@bitwarden/common/platform/abstractions/crypto-function.service";
import {
  CalloutModule,
  CheckboxModule,
  DialogService,
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
export class ImportLastPassComponent implements OnInit {
  private vault: Vault;

  private _parentFormGroup: FormGroup;
  protected formGroup = this.formBuilder.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.submit()],
        updateOn: "submit",
      },
    ],
    includeSharedFolders: [],
  });
  protected emailHint$ = this.formGroup.controls.email.statusChanges.pipe(
    map((status) => {
      if (status === "PENDING") {
        return "Finding your account...";
      }
    })
  );

  @Output() csvDataLoaded = new EventEmitter<string>();

  constructor(
    tokenService: TokenService,
    cryptoFunctionService: CryptoFunctionService,
    private formBuilder: FormBuilder,
    private controlContainer: ControlContainer,
    private dialogService: DialogService
  ) {
    this.vault = new Vault(cryptoFunctionService, tokenService);
  }

  ngOnInit(): void {
    this._parentFormGroup = this.controlContainer.control as FormGroup;
    this._parentFormGroup.addControl("lastpassOptions", this.formGroup);
  }

  private submit(): AsyncValidatorFn {
    return async () => {
      const email = this.formGroup.value.email;

      try {
        await this.vault.setUserTypeContext(email);
      } catch {
        return {
          accountNotFound: {
            message: "Cannot retrieve account",
          },
        };
      }

      if (this.vault.userType.isFederated()) {
        // TODO placeholder dialog
        await this.dialogService.openSimpleDialog({
          title: "Enter 2fa",
          type: "info",
          content: "Please enter your 2fa",
        });

        // await this.vault.openFederated()
      } else {
        // TODO placeholder dialog
        await this.dialogService.openSimpleDialog({
          title: "Enter password",
          type: "info",
          content: "Please enter your password",
        });

        // await this.vault.open(email, '');
      }

      // const csvData = this.vault.accountsToExportedCsvString()
      const csvData = `csv data ${email}`;
      this.csvDataLoaded.emit(csvData);
      return null;
    };
  }
}
