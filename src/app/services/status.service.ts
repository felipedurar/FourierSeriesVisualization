import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  public runStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
