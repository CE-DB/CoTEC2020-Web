import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { variable } from '@angular/compiler/src/output/output_ast';
import { parse } from 'path';

const entityListQuery = gql`
{
  healthCenters {
    name
    capacity
    totalICUBeds
    ubication {
      name
      country {
        name
      }
    }
    directorContact{
      firstName
      lastName
    }
  }
}`

const regionListQuery = gql`
{
  regions {
    name
    country {
      name
    }
  }
}`

const contactListQuery = gql`
{
  contacts {
    firstName
    identification
  }
}`

@Component({
  selector: 'app-adminhealthcenters',
  templateUrl: './adminhealthcenters.component.html',
  styleUrls: ['./adminhealthcenters.component.css']
})
export class AdminhealthcentersComponent implements OnInit {
  elementList: any[];
  currentElement: any;
  addResponse: string;
  editResponse: string;
  regionList: any[];
  contactList: any[];
  constructor(private apollo: Apollo) {

   }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: entityListQuery
    }).valueChanges.subscribe(signal => {
      this.elementList = signal.data.healthCenters;
    })

    this.apollo.watchQuery<any>({
      query: regionListQuery
    }).valueChanges.subscribe(signal => {
      this.regionList = signal.data.regions;
    })

    this.apollo.watchQuery<any>({
      query: contactListQuery
    }).valueChanges.subscribe(signal => {
      this.contactList = signal.data.contacts;
    })
  }

  selectElement(event) {
    try {
      let i = 0;
      for(; i < this.elementList.length; i++) {
        if(this.elementList[i].name === event.target.attributes.id.nodeValue) {
          this.currentElement = this.elementList[i];
        }
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  updateElement(event) {
    try {
      let query = gql`
      mutation updateHealthCenter($n: String!, $r: String!, $c: String!, $cap: Int, $tot: Int, $nr: String, $nn: String, $dir: String!){
        updateHealthCenter(name: $n, region: $r, country:$c, input: {
          name: $nn
          capacity: $cap
          totalICUBeds: $tot
          region: $nr
          directorContact: $dir
        }) {
          name
        }
      }`

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {n: this.currentElement.name,
                    r: this.currentElement.ubication.name,
                  c: this.currentElement.ubication.country.name,
                  nn: (<HTMLInputElement>document.getElementById("input1")).value,
                $cap: parseInt((<HTMLInputElement>document.getElementById("input2")).value),
              tot: parseInt((<HTMLInputElement>document.getElementById("input3")).value),
            nr: (<HTMLInputElement>document.getElementById("input4")).value,
          dir: (<HTMLInputElement>document.getElementById("input5")).value}
      }).subscribe(({data}) => {
        this.editResponse = "Updated Health Center";
      }, (error)=> {
        this.editResponse = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  addElement(event) {
    try {
      let query = gql`
      mutation addHealthCenter($n: String!, $c: Int!, $t: Int!, $r: String!, $d: String!, $country: String!) {
        addHealthCenter(input: {
          name: $n
          capacity: $c,
          totalICUBeds: $t
          directorContact: $d
          region: $r
          country: $country
        }) {
          name
        } 
      }`

      let i = 0;
      let temp = "";
      for(; i < this.regionList.length; i++) {
        if ((<HTMLInputElement>document.getElementById("get4")).value == this.regionList[i].name) {
          temp = this.regionList[i].country.name;
        }
      }

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {n: (<HTMLInputElement>document.getElementById("get1")).value,
                    c: parseInt((<HTMLInputElement>document.getElementById("get2")).value),
                    t: parseInt((<HTMLInputElement>document.getElementById("get3")).value),
                    r: (<HTMLInputElement>document.getElementById("get4")).value,
                    d: (<HTMLInputElement>document.getElementById("get5")).value,
                    country: temp}
      }).subscribe(({data}) => {
        this.addResponse = "Added health center"
      }, (error) => {
        this.addResponse = error;
      })

    }
    catch(e) {
      console.log(e);
    }
  }

  deleteElement(event){
    try {
      let query = gql`
      mutation deleteHealthCenter($n: String!, $r: String!, $c: String!){
        deleteHealthCenter(name: $n, region: $r, country: $c) {
          name
        }
      }`
      console.log(this.currentElement);

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {n: this.currentElement.name,
                    r: this.currentElement.ubication.name,
                  c: this.currentElement.ubication.country.name}
      }).subscribe(({data})=> {
        this.editResponse = "Deleted Health Center";
      }, (error)=> {
        this.editResponse = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }

}
