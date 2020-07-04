import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const entityListQuery = gql`
  {
    pathologies {
      name
      description
      symptoms
      treatment
    }
  }`

@Component({
  selector: 'app-adminpathologies',
  templateUrl: './adminpathologies.component.html',
  styleUrls: ['./adminpathologies.component.css']
})
export class AdminpathologiesComponent implements OnInit {
  elementList: any[];
  currentElement: any;
  addResponse: string;
  editResponse: string;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    
    this.apollo.watchQuery<any>({
      query: entityListQuery
    }).valueChanges.subscribe(signal => {
      this.elementList = signal.data.pathologies
    }, (error) => {
      console.log(error)
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
      mutation addPathology($n: String!, $d: String, $t: String) {
      addPathology(input: {
        name: $n,
        description: $d,
        symptoms: [],
        treatment: $t
      }) {
        name
      }
    }`

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {n: (<HTMLInputElement>document.getElementById("get1")).value,
                    d: (<HTMLInputElement>document.getElementById("get2")).value,
                  t: (<HTMLInputElement>document.getElementById("get4")).value}
      }).subscribe(({data}) => {
        this.addResponse = "Created pathology";
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
      mutation updatePathology($n: String!, $nn: String, $d: String, $t: String) {
        updatePathology(name: $n, input: {
          name: $nn
          description: $d
          treatment: $t
        }) {
          name
        }
      }`

      this.apollo.mutate<any>({
        mutation: query,
        refetchQueries: [{query: entityListQuery}],
        variables: {on: this.currentElement.name,
                    n: (<HTMLInputElement>document.getElementById("input1")).value,
                    d: (<HTMLInputElement>document.getElementById("input2")).value,
                  t: (<HTMLInputElement>document.getElementById("input4")).value}
      }).subscribe(({data})=>{
        this.editResponse = "Updated pathology";
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
      mutation deletePathology($n: String!) {
        deletePathology(name: $n) {
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
