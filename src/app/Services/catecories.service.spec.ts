import { TestBed } from '@angular/core/testing';

import { CatecoriesService } from './catecories.service';

describe('CatecoriesService', () => {
  let service: CatecoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatecoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
