import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import { Subscription } from 'rxjs';

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
  private querySuscription: Subscription;

  message: string = "Hello World";

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.querySuscription = this.apollo.watchQuery<any>({
      query: countrylist
    }).valueChanges.subscribe(result => {
      this.countryarr = result.data.countries; 
    });
  }

  sendMessage() {
    this.messageEvent.emit(this.message);
  }
}
