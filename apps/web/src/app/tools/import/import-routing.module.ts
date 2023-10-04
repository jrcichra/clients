import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ImportWebComponent } from "./import-web.component";

const routes: Routes = [
  {
    path: "",
    component: ImportWebComponent,
    data: { titleId: "importData" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ImportRoutingModule {}
