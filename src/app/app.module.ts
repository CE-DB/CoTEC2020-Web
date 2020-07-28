import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpClientModule } from "@angular/common/http";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http"
import { InMemoryCache } from "apollo-cache-inmemory";
import { CountriesComponent } from './countries/countries.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DailycasesgraphComponent } from './dailycasesgraph/dailycasesgraph.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminregionsComponent } from './adminregions/adminregions.component';
import { AdminpathologiesComponent } from './adminpathologies/adminpathologies.component';
import { AdminstatesComponent } from './adminstates/adminstates.component';
import { AdminhealthcentersComponent } from './adminhealthcenters/adminhealthcenters.component';
import { AdminsanitarymeasuresComponent } from './adminsanitarymeasures/adminsanitarymeasures.component';
import { AdmincontentionmeasuresComponent } from './admincontentionmeasures/admincontentionmeasures.component';
import { AdminmedicationsComponent } from './adminmedications/adminmedications.component';
import { HcpatientsComponent } from './hcpatients/hcpatients.component';
import { HccontactsComponent } from './hccontacts/hccontacts.component';
import { HcreportsComponent } from './hcreports/hcreports.component'

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    StatisticsComponent,
    DailycasesgraphComponent,
    DashboardComponent,
    AdminregionsComponent,
    AdminpathologiesComponent,
    AdminstatesComponent,
    AdminhealthcentersComponent,
    AdminsanitarymeasuresComponent,
    AdmincontentionmeasuresComponent,
    AdminmedicationsComponent,
    HcpatientsComponent,
    HccontactsComponent,
    HcreportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          /*
          Link graphql final deploy
          */
          uri: "https://cotec-server.herokuapp.com/graphql",
        })
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
