import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedhubdataService {

  private signalSource = new BehaviorSubject<any>({name: "Global"})
  currentSignal = this.signalSource.asObservable();

  constructor() { }

  changeMessage(signal: any) {
    this.signalSource.next(signal)
  }
}
