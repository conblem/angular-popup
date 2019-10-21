import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { POPUP_DATA } from '../popup/popup.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass'],
})
export class TestComponent implements OnInit, OnDestroy {
  public ngOnInit$ = new Subject<undefined>();

  constructor(@Inject(POPUP_DATA) public data: string) {}

  public ngOnInit() {
    this.ngOnInit$.next();
    this.ngOnInit$.complete();
  }

  public ngOnDestroy(): void {
    console.log('TestComponent got closed');
  }

  public logToConsole() {
    console.log('logToConsole called');
  }
}
