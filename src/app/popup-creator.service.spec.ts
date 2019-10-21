import { TestBed } from '@angular/core/testing';

import { PopupCreatorService } from './popup-creator.service';

describe('PopupCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupCreatorService = TestBed.get(PopupCreatorService);
    expect(service).toBeTruthy();
  });
});
