import { NgModule } from "@angular/core";

import { LooseComponentsModule, SharedModule } from "../../../../shared";

import { OrganizationVaultExportRoutingModule } from "./org-export-routing.module";
import { OrganizationVaultExportComponent } from "./org-export.component";

@NgModule({
  imports: [SharedModule, LooseComponentsModule, OrganizationVaultExportRoutingModule],
  declarations: [OrganizationVaultExportComponent],
})
export class OrganizationVaultExportModule {}
