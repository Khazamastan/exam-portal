import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import {Router} from "@angular/router";
import { CounterService } from "../service/counter.service";


@Component({
    selector: 'app-counter',
    template: `
  <strong>
    {{message}}
  </strong>
`
})
export class AppCounter implements OnInit, OnDestroy {
    @Input() mills = 0;
    private future: Date;
    private futureString: string;
    private $counter: Observable<number>;
    private subscription: Subscription;
    message: string;

    constructor(elm: ElementRef, private router: Router, private counter: CounterService) {
        this.futureString = elm.nativeElement.getAttribute('inputDate');
    }

    dhms(t) {
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;

        return [
            // days + 'd',
            // hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
    }


    ngOnInit() {
        var mills = this.mills;
        var minutes = Math.floor(mills / 60000);
        this.counter.initCounter(minutes)
        if(this.counter.$diff){
            this.subscription = this.counter.$diff.subscribe((diff) => {
                this.message = this.dhms(diff);
                if(diff === 0){
                    this.subscription.unsubscribe();
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}