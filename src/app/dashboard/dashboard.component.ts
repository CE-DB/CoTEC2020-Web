import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const countryListQuery = gql`
  {
    countries {
      name
      continent {
        name
      }
    }
  }`

const globalStatsQuery = gql`
  { 
    globalGeneralReport {
      totalInfected
      totalActive
      totalInfected
      totalRecovered
      totalDeceased
      dailyIncrement {
        day
      }
    }
  }`

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  countryList: any[];
  locationStats: any;
  currentCountryStats: any;
  locationName = "Global";

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: countryListQuery
    }).valueChanges.subscribe(result => {
      this.countryList = result.data.countries;
    })

    this.apollo.watchQuery<any>({
      query: globalStatsQuery
    }).valueChanges.subscribe(result => {
      this.locationStats = result.data.globalGeneralReport;
    })
  }

  countrySelected(event) {
    this.locationName = event.target.attributes.id.nodeValue
    this.apollo.watchQuery<any>({
      query : this.getQueryString(event.target.attributes.id.nodeValue)
    }).valueChanges.subscribe(result => {
      this.locationStats = result.data.countryGeneralReport;
    })

    ;


  }

  getQueryString(country: string) {
    country = '"' + country + '"';
    console.log(country)
    return gql`
    { 
      countryGeneralReport(country: ${country}) { 
        name
        totalInfected
        totalActive
        totalInfected
        totalRecovered
        totalDeceased
        sanitaryMeasures {
          measure {
            name
            description
          }
          startDate
          endDate
        }
        contentionMeasures {
          measure {
            name
            description
          }
          startDate
          endDate
        }
        dailyIncrement {
          day
          deceased
          infected
          active
        }
      }
    }`
  } 

}
