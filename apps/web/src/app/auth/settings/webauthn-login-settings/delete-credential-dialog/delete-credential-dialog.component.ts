import { DialogConfig, DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

import { VerificationType } from "@bitwarden/common/auth/enums/verification-type";
import { ErrorResponse } from "@bitwarden/common/models/response/error.response";
import { I18nService } from "@bitwarden/common/platform/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/platform/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/platform/abstractions/platform-utils.service";
import { DialogService } from "@bitwarden/components";

import { WebauthnLoginService } from "../../../core";
import { WebauthnCredentialView } from "../../../core/views/webauth-credential.view";

export interface DeleteCredentialDialogParams {
  credentialId: string;
}

@Component({
  templateUrl: "delete-credential-dialog.component.html",
})
export class DeleteCredentialDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  protected formGroup = this.formBuilder.group({
    masterPassword: ["", [Validators.required]],
  });
  protected credential?: WebauthnCredentialView;
  protected loading$ = this.webauthnService.loading$;

  constructor(
    @Inject(DIALOG_DATA) private params: DeleteCredentialDialogParams,
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef,
    private webauthnService: WebauthnLoginService,
    private platformUtilsService: PlatformUtilsService,
    private i18nService: I18nService,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.webauthnService
      .getCredential$(this.params.credentialId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((credential) => (this.credential = credential));
  }

  submit = async () => {
    if (this.credential === undefined) {
      return;
    }

    this.dialogRef.disableClose = true;
    try {
      await this.webauthnService.deleteCredential(this.credential.id, {
        type: VerificationType.MasterPassword,
        secret: this.formGroup.value.masterPassword,
      });
      this.platformUtilsService.showToast("success", null, this.i18nService.t("passkeyRemoved"));
    } catch (error) {
      if (error instanceof ErrorResponse && error.statusCode === 400) {
        this.platformUtilsService.showToast(
          "error",
          this.i18nService.t("error"),
          this.i18nService.t("invalidMasterPassword")
        );
      } else {
        this.logService.error(error);
        this.platformUtilsService.showToast("error", null, this.i18nService.t("unexpectedError"));
      }
      return false;
    } finally {
      this.dialogRef.disableClose = false;
    }

    this.dialogRef.close();
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * Strongly typed helper to open a DeleteCredentialDialogComponent
 * @param dialogService Instance of the dialog service that will be used to open the dialog
 * @param config Configuration for the dialog
 */
export const openDeleteCredentialDialogComponent = (
  dialogService: DialogService,
  config: DialogConfig<DeleteCredentialDialogParams>
) => {
  return dialogService.open<unknown>(DeleteCredentialDialogComponent, config);
};
