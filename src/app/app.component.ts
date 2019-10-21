import { Component } from '@angular/core';
import { PopupCreatorService } from './popup-creator.service';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'popup-test';

  constructor(private popup: PopupCreatorService) {}

  public open(): void {
    const popup = this.popup.open(
      TestComponent,
      'Custom Data passed in app.component.ts',
      '600px',
      '1000px',
    );

    // example on how to know current state of instance
    popup.instance.ngOnInit$.subscribe(() =>
      console.log('ngOnInit called in TestComponent'),
    );

    setTimeout(() => {
      console.log('close');
      popup.close();
    }, 3000);
  }
}
