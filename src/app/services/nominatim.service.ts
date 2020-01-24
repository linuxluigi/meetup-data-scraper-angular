import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { INominatim } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  nominatimChanged = new EventEmitter<INominatim[]>();

  // fetching status
  isFetchingChanged = new EventEmitter<boolean>();

  // fetching error
  fetchingErrorChanged = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  fetchNoinatim(query: string) {
    /*
      Fetch gelocation from https://nominatim.openstreetmap.org by a query
    */

    // set fetching to running
    this.isFetchingChanged.emit(true);
    // set fetching to running
    this.fetchingErrorChanged.emit(null);

    // set response content type
    const params = new HttpParams()
      .set('format', 'json');

    return this.http.get<INominatim[]>(`https://nominatim.openstreetmap.org/search/${query}`, { params })
      .subscribe((nominatimResults: INominatim[]) => {
        // emit nominatim
        this.nominatimChanged.emit(nominatimResults);

        // set loading to done
        this.isFetchingChanged.emit(false);
      }, error => {
        this.isFetchingChanged.emit(false);
        this.fetchingErrorChanged.emit(error.message);
      });
  }

}
