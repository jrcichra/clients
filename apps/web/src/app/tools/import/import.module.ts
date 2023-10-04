import { NgModule } from "@angular/core";

import { ImportComponent } from "@bitwarden/importer";

import { LooseComponentsModule, SharedModule } from "../../shared";

import { ImportRoutingModule } from "./import-routing.module";
import { ImportWebComponent } from "./import-web.component";

@NgModule({
  imports: [SharedModule, LooseComponentsModule, ImportRoutingModule, ImportComponent],
  declarations: [ImportWebComponent],
})
export class ImportModule {}
