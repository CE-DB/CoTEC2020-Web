import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import { Subscription as ServiceSuscription} from 'rxjs';
import { SharedhubdataService } from '../sharedhubdata.service';

const countrylist = gql`
  {
    countries {
      name
    }
  }
  `;

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countryarr: any[];
  currentcountry: Object;
  private querySuscription: ServiceSuscription;

  constructor(private apollo: Apollo, private data: SharedhubdataService) { }

  ngOnInit(): void {
    this.data.currentSignal.subscribe(signal => this.currentcountry = signal);

    this.querySuscription = this.apollo.watchQuery<any>({
      query: countrylist
    }).valueChanges.subscribe(result => {
      this.countryarr = result.data.countries; 
    });
  }

  newCountry(event) {
    try {
      let idnum: number = +event.target.attributes.id.nodeValue;
      this.data.changeMessage(this.countryarr[idnum]);
    }
    catch(e) {
      console.log(e)
    }
    
  
  }
}
