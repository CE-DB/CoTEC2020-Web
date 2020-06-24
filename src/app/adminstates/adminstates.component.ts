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
      mutation {
        addPatientState(name: ${document.getElementById("get1").nodeValue})
      }`
      this.apollo.mutate<any>({
        mutation: query
      }).subscribe(({data}) => {
        this.addResponse = "Added state " + data.updatePatientState;
        console.log("added state");
      }, (error) => {
        this.addResponse = "There was the following error " + error;
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
      mutation {
        updatePatientState(oldName: ${this.currentElement}, newName: ${document.getElementById("input1").nodeValue})
      }`
    }
    catch(e) {
      console.log(e);
    }
  }

  deleteElement(event) {

  }
}
