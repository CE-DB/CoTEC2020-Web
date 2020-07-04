import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const countryListQuery = gql`
  {
    countries {
      name
    }
  }`

@Component({
  selector: 'app-adminsanitarymeasures',
  templateUrl: './adminsanitarymeasures.component.html',
  styleUrls: ['./adminsanitarymeasures.component.css']
})
export class AdminsanitarymeasuresComponent implements OnInit {
  elementList: any[];
  contentionList: any[];
  currentElement: any;
  currentMeasure: any;
  addResponse: string;
  editResponse: string;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: countryListQuery
    }).valueChanges.subscribe(signal => {
      this.elementList = signal.data.countries;
    })
  }

  selectElement(event) {
    try {
      let query = gql`
      query countryGeneralReport($c: String!){
        countryGeneralReport(country: $c) {
        sanitaryMeasures {
        startDate
        endDate
        measure{
          name
          description
        }
      }
    }
  }`

      this.apollo.mutate<any>({
        mutation: query,
        variables: {c: event.target.attributes.id.nodeValue}
      }).subscribe(({data}) => {
          this.contentionList = data.countryGeneralReport.contentionMeasures;
      }, (error) => {
        console.log(error);
      })
      this.sanitarySelected();
    }
    catch(e) {
      console.log(e);
    }
  }

  sanitarySelected() {
    try {
      let i = 0;
      for(; i < this.contentionList.length; i++) {
        if(this.contentionList[i].measure.name == (<HTMLInputElement>document.getElementById("select1")).value) {
          this.currentMeasure = this.contentionList[i];
          break;
        }
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  addElement(event) {
    try {
      let query1 = gql`
      mutation addSanitaryMeasure($n: String!, $d: String!){
        addSanitaryMeasure(name: $n, description: $d) {
          name
        }
      }`

      this.apollo.mutate<any>({
        mutation: query1,
        variables: {n: (<HTMLInputElement>document.getElementById("get1")).value,
                    d: (<HTMLInputElement>document.getElementById("get2")).value}
      }).subscribe(({data}) => {
        console.log("Added " + data.addSanitaryMeasure.name + " measure");
      }, (error) => {
        this.addResponse = error;
      })

      let query2 = gql`
      mutation addContentionMeasureActive($c: String!, $sd: Date!, $ed: Date!, $m: String!){
        addSanitaryMeasureActive(country: $c, startDate: $sd, endDate: $ed, measure: $m) {
          country {
            name
          }
        }
      }`

      this.apollo.mutate<any>({
        mutation: query2,
        variables: {m: (<HTMLInputElement>document.getElementById("get1")).value,
                    c: (<HTMLInputElement>document.getElementById("get3")).value,
                    sd: (<HTMLInputElement>document.getElementById("get4")).value,
                    ed: (<HTMLInputElement>document.getElementById("get5")).value}
      }).subscribe(({data}) => {
        this.addResponse = "Added measure to " + data.addSanitaryMeasureActive.country.name; 
      }, (error) => {
        this.addResponse = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  updateElement(event) {
    try {
      let query = gql`
      mutation updateSanitaryMeasureActive($c: String, $m: String, $i: ContentionEvent){
        updateSanitaryMeasureActive(country: $c, measure: $m, input: $i) {
          measure {
            name
          }
        }
      }`

      this.apollo.mutate<any>({
        mutation: query,
        variables: {}
      }).subscribe(({data}) => {
        this.editResponse = data
      }, (error) => {
        this.editResponse = error;
      })
    }
    catch(e) {
      console.log(e);
    }

  }
 
  deleteElement(event) {

  }

}

