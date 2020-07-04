import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const stateListQuery = gql`
  {
  patientStates
  }`

@Component({
  selector: 'app-adminstates',
  templateUrl: './adminstates.component.html',
  styleUrls: ['./adminstates.component.css']
})
export class AdminstatesComponent implements OnInit {
  elementList: any[];

  currentElement: any;
  addResponse: string;
  editResponse: string;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: stateListQuery  
    }).valueChanges.subscribe(signal => {
        this.elementList = signal.data.patientStates;
    })
  }

  selectElement(event) {
    try {
      this.currentElement = event.target.attributes.id.nodeValue;
    }
    catch(e) {
      console.log(e);
    }
  }

  addElement(event) {
    try {
      console.log(document.getElementById("get1").nodeValue);
      let query = gql`
      mutation addPatientState($state: String!){
        addPatientState(name: $state)
      }`
      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: stateListQuery}],
        variables: {state: (<HTMLInputElement>document.getElementById("get1")).value}
      }).subscribe(({data}) => {
        this.addResponse = "Added state " + data.updatePatientState;
        console.log("added state");
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
      mutation updatePatientState($on: String!, $nn: String!) {
        updatePatientState(oldName: $on, newName: $nn)
      }`

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: stateListQuery}],
        variables: {
          on: this.currentElement, nn: (<HTMLInputElement>document.getElementById("input1")).value        }
      }).subscribe(({data}) => {
        if (data.updatePatientState != null) {
          this.editResponse = "The state was successfully updated"
        }
        else {
          this.editResponse = "An error occurred, couldn't update"
        }
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
        mutation deletePathology($n: String!){
          deletePatientState(name: $n)
      }`

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: stateListQuery}],
        variables: {n: this.currentElement}
      }).subscribe(({data}) => {
        this.editResponse = "The state " + data.deletePatientState +" was removed";
      }, (error) => {
        this.editResponse = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }
}
