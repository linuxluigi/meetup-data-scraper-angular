/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NominatimService } from './nominatim.service';

describe('Service: Nominatim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NominatimService]
    });
  });

  it('should ...', inject([NominatimService], (service: NominatimService) => {
    expect(service).toBeTruthy();
  }));
});
