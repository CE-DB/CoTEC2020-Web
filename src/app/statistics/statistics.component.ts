import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import { Subscription } from 'rxjs';
import { SharedhubdataService } from '../sharedhubdata.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

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
  total = 0;
  regionName = "global";  

  constructor(private apollo: Apollo, private data: SharedhubdataService) { }
  
  ngOnInit(): void {
    this.querySuscription = this.apollo.watchQuery<any>({
      query: patientinfo
    }).valueChanges.subscribe(result => {
      this.patientarr = result.data.patients;
      this.data.changeMessage({name: "Global"})
    });

    this.data.currentSignal.subscribe(
      signal => {
        this.total = 0;
        this.active = 0;
        this.deceased = 0;
        console.log(signal.name);
        this.regionName = signal.name;
        let i = 0;
        if (this.getPatientarr() != null) {
          for (; i < this.getPatientarr().length; i++) {
            if (this.regionName === "Global" || this.regionName === this.getPatientarr()[i].nationality) {
              this.total++
              if (this.patientarr[i].state == "Active") {
                this.active++;
              }
              if (this.patientarr[i].state == "Deceased") {
                this.deceased++;
              }
            }
          }
        }
      });
    }

    getPatientarr() {
      return (this.patientarr) ? this.patientarr : null ;
    }
}
