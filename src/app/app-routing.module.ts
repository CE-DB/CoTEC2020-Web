import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminstatesComponent } from './adminstates/adminstates.component';
import { AdminpathologiesComponent } from './adminpathologies/adminpathologies.component';
import { AdminregionsComponent } from './adminregions/adminregions.component';
import { AdminmedicationsComponent } from './adminmedications/adminmedications.component';
import { AdminsanitarymeasuresComponent } from './adminsanitarymeasures/adminsanitarymeasures.component';
import { AdmincontentionmeasuresComponent } from './admincontentionmeasures/admincontentionmeasures.component';
import { AdminhealthcentersComponent } from './adminhealthcenters/adminhealthcenters.component';
import { HcpatientsComponent } from './hcpatients/hcpatients.component';
import { HccontactsComponent } from './hccontacts/hccontacts.component';
import { HcreportsComponent } from './hcreports/hcreports.component';

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {path: "admin", children: [
    {path: "", pathMatch: "full", redirectTo: "states"},
    {path: "states", component: AdminstatesComponent},
    {path: "pathologies", component: AdminpathologiesComponent},
    {path: "regions", component: AdminregionsComponent},
    {path: "medications", component: AdminmedicationsComponent},
    {path: "sanitarymeasures", component: AdminsanitarymeasuresComponent},
    {path: "contentionmeasures", component: AdmincontentionmeasuresComponent},
    {path: "healthcenters", component: AdminhealthcentersComponent}
  ]},
  {path: "healthcenter", children: [
    {path: "", redirectTo: "patients", pathMatch: "full"},
    {path: "patients", component: HcpatientsComponent},
    {path: "contacts", component: HccontactsComponent},
    {path: "reports", component: HcreportsComponent}
  ]}
]

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
