import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import { Subscription } from 'rxjs';

const patientinfo = gql` 
  {
    patients {
      nationality,
      state,
      dateEntrance
    }
  }`;


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private querySuscription: Subscription;

  patientarr: any[];
  active = 0;
  deceased = 0;
  regionName = "global";  

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.querySuscription = this.apollo.watchQuery<any>({
      query: patientinfo
    }).valueChanges.subscribe(result => {
      this.patientarr = result.data.patients;
      let i = 0;
      for (; i < this.patientarr.length; i++) {
        if (this.patientarr[i].state == "Active") {
          this.active++;
        }
        if (this.patientarr[i].state == "Deceased") {
          this.deceased++;
        }
      }
    });
  }

  receiveMessage($event) {
    this.regionName = $event;
  }
}
