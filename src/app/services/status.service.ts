import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  public runStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public bidimensionalViewHeight: BehaviorSubject<number> = new BehaviorSubject<number>(600);

  public time: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }
}
