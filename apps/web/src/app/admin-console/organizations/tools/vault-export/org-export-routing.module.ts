import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { Organization } from "@bitwarden/common/admin-console/models/domain/organization";

import { OrganizationPermissionsGuard } from "../../guards/org-permissions.guard";

import { OrganizationExportComponent } from "./org-export.component";

const routes: Routes = [
  {
    path: "",
    component: OrganizationExportComponent,
    canActivate: [OrganizationPermissionsGuard],
    data: {
      titleId: "exportVault",
      organizationPermissions: (org: Organization) => org.canAccessImportExport,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class OrganizationExportRoutingModule {}
