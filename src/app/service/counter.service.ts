import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class CounterService {
  future: Date;
  futureString: string;
  $diff: Observable<number>;
  constructor() {

  }

  initCounter(minutes){
      this.future = new Date();
      this.future.setMinutes(this.future.getMinutes() + minutes);
      this.$diff = Observable.interval(1000).map((x) => {
          const diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
          return diff;
      });
  }


}