/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { SuggestService } from './suggest.service';

describe('Service: Suggest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuggestService]
    });
  });

  it('should ...', inject([SuggestService], (service: SuggestService) => {
    expect(service).toBeTruthy();
  }));
});
