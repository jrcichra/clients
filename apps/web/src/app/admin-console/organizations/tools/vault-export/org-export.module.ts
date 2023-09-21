import { NgModule } from "@angular/core";

import { LooseComponentsModule, SharedModule } from "../../../../shared";

import { OrganizationExportRoutingModule } from "./org-export-routing.module";
import { OrganizationExportComponent } from "./org-export.component";

@NgModule({
  imports: [SharedModule, LooseComponentsModule, OrganizationExportRoutingModule],
  declarations: [OrganizationExportComponent],
})
export class OrganizationExportModule {}
