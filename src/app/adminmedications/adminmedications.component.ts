import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { element } from 'protractor';

const entityListQuery = gql`
  {
    medications {
      name
      pharmaceutical
    }
  }`

@Component({
  selector: 'app-adminmedications',
  templateUrl: './adminmedications.component.html',
  styleUrls: ['./adminmedications.component.css']
})
export class AdminmedicationsComponent implements OnInit {
  elementList: any[];
  currentElement: any;
  addResponse: string;
  editResponse: string;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: entityListQuery
    }).valueChanges.subscribe(signal => {
      this.elementList = signal.data.medications
    })
  }

  selectElement(event) {
    let i = 0;
    for(; i<this.elementList.length; i++) {
      if(this.elementList[i].name === event.target.attributes.id.nodeValue) {
        this.currentElement = this.elementList[i];
        break;
      }
    }
  }

  addElement(event) {
    try {
      let query = gql`
      mutation addMedication($n: String!, $p: String!){
        addMedication(name: $n,
        pharmaceutical: $p) {
          name
          pharmaceutical
        }
      }`

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {n: (<HTMLInputElement>document.getElementById("get1")).value,
                    p: (<HTMLInputElement>document.getElementById("get2")).value}
      }).subscribe(({data}) => {
        this.addResponse = "Created medication";
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
      mutation updateMedication($on: String!, $nn: String, $p: String) {
        updateMedication(oldName: $on, newName: $nn, pharmaceutical: $p) {
          name
        }
      }`

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {on: this.currentElement.name,
                    nn: (<HTMLInputElement>document.getElementById("input1")).value,
                    p: (<HTMLInputElement>document.getElementById("input2")).value}
      }).subscribe(({data})=>{
        this.editResponse = "Updated medication";
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
      mutation deleteMedication($n: String!) {
        deleteMedication(name: $n) {
          name
        }
      }`

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {n: this.currentElement.name}
      }).subscribe(({data})=> {
        this.editResponse = "Delete medication";
      }, (error) => {
        this.editResponse = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }

}
