import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  ComponentRef,
  Type,
  ApplicationRef,
} from '@angular/core';
import { PopupComponent, IPopupInstance } from './popup/popup.component';

@Injectable({
  providedIn: 'root',
})
export class PopupCreatorService implements OnDestroy {
  private popupComponent: ComponentRef<PopupComponent>;

  constructor(
    private resolver: ComponentFactoryResolver,
    injector: Injector,
    private application: ApplicationRef,
  ) {
    const factory = resolver.resolveComponentFactory(PopupComponent);
    this.popupComponent = factory.create(injector);

    document.body.appendChild(this.popupComponent.location.nativeElement);
    application.attachView(this.popupComponent.hostView);
  }

  public ngOnDestroy(): void {
    this.application.detachView(this.popupComponent.hostView);
    this.popupComponent.destroy();
    document.body.removeChild(this.popupComponent.location.nativeElement);
  }

  public open<T>(
    componentType: Type<T>,
    data: any,
    height: string,
    width: string,
  ): IPopupInstance<T> {
    const factory = this.resolver.resolveComponentFactory(componentType);

    return this.popupComponent.instance.open(factory, data, height, width);
  }
}
