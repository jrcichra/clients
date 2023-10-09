import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { firstValueFrom } from "rxjs";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import {
  OrganizationService,
  canAccessVaultTab,
} from "@bitwarden/common/admin-console/abstractions/organization/organization.service.abstraction";
import { AsyncActionsModule, ButtonModule } from "@bitwarden/components";
import { ImportComponent } from "@bitwarden/importer/ui";

@Component({
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
export class ImportWebComponent implements OnInit {
  protected routeOrgId: string = null;
  protected loading = false;
  protected disabled = false;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeOrgId = this.route.snapshot.paramMap.get("organizationId");
  }

  /**
   * Callback that is called after a successful import.
   */
  protected async onSuccessfulImport(organizationId: string): Promise<void> {
    if (!organizationId) {
      await this.router.navigate(["vault"]);
      return;
    }

    const organization = await firstValueFrom(this.organizationService.get$(organizationId));
    if (organization == null) {
      return;
    }

    if (canAccessVaultTab(organization)) {
      await this.router.navigate(["organizations", organizationId, "vault"]);
    }
  }
}
