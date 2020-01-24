/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { NominatimService } from './nominatim.service';

describe('Service: Nominatim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NominatimService]
    });
  });

  it('should ...', inject([NominatimService], (service: NominatimService) => {
    expect(service).toBeTruthy();
  }));
});
