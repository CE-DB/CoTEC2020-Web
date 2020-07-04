import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const entityListQuery = gql`
  {
    regions {
      name
      country {
        name
      }
    }
  }`

const countryListQuery = gql`
  {
    countries {
      name
    }
  }`

@Component({
  selector: 'app-adminregions',
  templateUrl: './adminregions.component.html',
  styleUrls: ['./adminregions.component.css']
})
export class AdminregionsComponent implements OnInit {
  elementList: any[];
  countryList: any[];
  currentElement: any;
  addResponse: string;
  editResponse: string;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: entityListQuery
    }).valueChanges.subscribe(signal => {
      this.elementList = signal.data.regions
    })


    this.apollo.watchQuery<any>({
      query: countryListQuery
    }).valueChanges.subscribe(signal => {
      this.countryList = signal.data.countries;
    })
  }

  selectElement(event) {
    try {
      let i = 0;
      for(; i <= this.elementList.length; i++) {
        if(this.elementList[i].name === event.target.attributes.id.nodeValue) {
          this.currentElement = this.elementList[i];
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
      let query = gql`
      mutation addRegion($c: String!, $n: String!){
        addRegion(country: $c, name: $n) {
          name
        }
      }`
      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {c: (<HTMLInputElement>document.getElementById("get2")).value,
                    n: (<HTMLInputElement>document.getElementById("get1")).value}
      }).subscribe(({data}) => {
        this.addResponse = "Added region " + data.addRegion.name;
        console.log("added region");
      }, (error) => {
        this.addResponse = "There was the following error\n" + error;
        console.log(error);
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  updateElement(event) {
    try {
      let query = gql`
      mutation updateRegion($oc: String!, $nc: String!, $on: String!, $nn: String!) {
        updateRegion(oldCountry: $oc, newCountry: $nc, oldName: $on, newName: $nn) {
          name
        }
      }`
          
      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {oc: this.currentElement.country.name,
                    nc: (<HTMLInputElement>document.getElementById("input2")).value,
                    on: this.currentElement.name,
                    nn: (<HTMLInputElement>document.getElementById("input1")).value}
      }).subscribe(({data}) => {
        this.editResponse = "Updated region"
      }, (error) => {
        this.editResponse = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  deleteElement(event) {
    try {
      let query = gql`
      mutation addRegion($c: String!, $n: String!){
        deleteRegion(country: $c, name: $n) {
          name
        }
      }`
      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {c: this.currentElement.country.name,
                    n: this.currentElement.name}
      }).subscribe(({data}) => {
        this.editResponse = "Deleted region " + data.deleteRegion.name;
      }, (error) => {
        this.addResponse = "There was the following error\n" + error;
        console.log(error);
      })
    }
    catch(e) {
      console.log(e);
    }
  }

}
