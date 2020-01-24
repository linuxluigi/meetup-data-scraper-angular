import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INominatim } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  nominatimChanged = new EventEmitter<[INominatim]>();

  // True -> search request is running; False -> done
  showProgressbarChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  fetchNoinatim(query: string) {

    // show progressbar
    this.showProgressbarChanged.emit(true);

    return this.http.get<[INominatim]>('https://nominatim.openstreetmap.org/search/' + query + '?format=json')
      .subscribe(nominatimResults => {
        // emit nominatim
        this.nominatimChanged.emit(nominatimResults as [INominatim]);

        // hide progressbar
        this.showProgressbarChanged.emit(false);
      });
  }

}
