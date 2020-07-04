import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-hcreports',
  templateUrl: './hcreports.component.html',
  styleUrls: ['./hcreports.component.css']
})
export class HcreportsComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  getstatereport() {
    let file = "";

    this.apollo.watchQuery<any>({
      query: gql`{patientsReport}`
    }).valueChanges.subscribe(signal => {
      file = signal.data.patientsReport;
    })

    const linkSource = 'data:application/pdf;base64,' + file;
    const downloadLink = document.createElement("a");
    const fileName = "document.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  getcasesreport() {
    let file = "";

    this.apollo.watchQuery<any>({
      query: gql`{newCasesReport}`
    }).valueChanges.subscribe(signal => {
      file = signal.data.newCasesReport;
    })

    const linkSource = 'data:application/pdf;base64,' + file;
    const downloadLink = document.createElement("a");
    const fileName = "document.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
