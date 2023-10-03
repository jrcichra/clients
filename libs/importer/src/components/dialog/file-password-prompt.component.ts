import { DialogRef } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import {
  AsyncActionsModule,
  ButtonModule,
  DialogModule,
  FormFieldModule,
  IconButtonModule,
} from "@bitwarden/components";

@Component({
  templateUrl: "file-password-prompt.component.html",
  standalone: true,
  imports: [
    CommonModule,
    JslibModule,
    DialogModule,
    FormFieldModule,
    AsyncActionsModule,
    ButtonModule,
    IconButtonModule,
  ],
})
export class FilePasswordPromptComponent {
  filePassword = new FormControl("", Validators.required);

  constructor(public dialogRef: DialogRef) {}

  submit() {
    this.filePassword.markAsTouched();
    if (!this.filePassword.valid) {
      return;
    }
    this.dialogRef.close(this.filePassword.value);
  }
}
