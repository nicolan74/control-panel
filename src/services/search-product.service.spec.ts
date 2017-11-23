import { TestBed, inject } from '@angular/core/testing';

import { SearchProductService } from './search-product.service';

describe('SearchProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchProductService]
    });
  });

  it('should be created', inject([SearchProductService], (service: SearchProductService) => {
    expect(service).toBeTruthy();
  }));
});
