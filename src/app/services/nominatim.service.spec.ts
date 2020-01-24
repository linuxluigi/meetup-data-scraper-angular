/* tslint:disable:no-unused-variable */

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { INominatim } from './interfaces';
import { NominatimService } from './nominatim.service';

class HttpClientStub {
  get(): Observable<INominatim[]> {
    return of([]);
  }
}

describe('Service: Nominatim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useClass: HttpClientStub }
      ]
    });
  });

  it('should be created', inject([NominatimService], (service: NominatimService) => {
    expect(service).toBeTruthy();
  }));

  it('should emit greeting event', (done) => {
    inject([NominatimService, HttpClient], (service: NominatimService, http: HttpClientStub) => {

      const httpGetResponseMock: INominatim[] = [];

      const httpGetSpy = spyOn(http, 'get').and.returnValue(of(httpGetResponseMock));

      const onNext = result => {
        expect(httpGetSpy).toHaveBeenCalled();
        expect(result.length).toEqual(0);
        done();
      };

      const onError = error => {
        fail(error);
        done();
      };

      const onComplete = () => {
        done();
      };

      service.nominatimChanged.subscribe(onNext, onError, onComplete);

      service.fetchNoinatim('asd');
    })();
  });

});
