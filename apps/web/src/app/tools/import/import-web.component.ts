import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import { AsyncActionsModule, ButtonModule } from "@bitwarden/components";
import { ImportComponent } from "@bitwarden/importer";

@Component({
  selector: "app-import-web",
  templateUrl: "import-web.component.html",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    JslibModule,
    AsyncActionsModule,
    ButtonModule,
    ImportComponent,
  ],
})
export class ImportWebComponent {}
