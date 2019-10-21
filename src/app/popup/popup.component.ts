import {
  Component,
  Injector,
  ViewContainerRef,
  ComponentFactory,
  ComponentRef,
  OnDestroy,
  ViewChild,
  InjectionToken,
} from '@angular/core';

export interface IPopupInstance<T> {
  instance: T;
  close: () => void;
}

export const POPUP_DATA = new InjectionToken('POPUP_DATA');
export const POPUP_INSTANCE = new InjectionToken('POPUP_INSTANCE');

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass'],
})
export class PopupComponent implements OnDestroy {
  @ViewChild('viewContainerRef', { static: false, read: ViewContainerRef })
  public viewContainerRef: ViewContainerRef;

  public visible = false;
  public height = '';
  public width = '';

  private componentRef?: ComponentRef<any>;
  constructor(private injector: Injector) {}

  public open<T>(
    componentFactory: ComponentFactory<T>,
    data: any,
    height: string,
    width: string,
  ): IPopupInstance<T> {
    this.ngOnDestroy();

    const popupInstance = {};

    const componentRef = this.createComponent(
      componentFactory,
      data,
      popupInstance,
    );
    componentRef.onDestroy(() => {
      if (componentRef === this.componentRef) {
        this.componentRef = undefined;
        this.visible = false;
      }
    });
    this.componentRef = componentRef;

    this.visible = true;
    this.height = height;
    this.width = width;

    return Object.assign(popupInstance, {
      instance: this.componentRef.instance,
      close: this.componentRef.destroy.bind(this.componentRef),
    });
  }

  private createComponent<T>(
    componentFactory: ComponentFactory<T>,
    data,
    popupInstance,
  ): ComponentRef<T> {
    const popupInjector = Injector.create({
      providers: [
        { provide: POPUP_DATA, useValue: data },
        { provide: POPUP_INSTANCE, useValue: popupInstance },
      ],
      parent: this.injector,
    });

    return this.viewContainerRef.createComponent(
      componentFactory,
      0,
      popupInjector,
    );
  }

  public close(): void {
    this.ngOnDestroy();
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
