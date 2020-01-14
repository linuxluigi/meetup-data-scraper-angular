import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearchResponse, ISearchRequest } from './interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchChanged = new EventEmitter<ISearchResponse>();

  requestData: ISearchRequest = {
    query: '',
  };

  // True -> search request is running; False -> done
  showSpinnerChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  fetchSearch() {
    /*
    fetch suggestion from api server
    */

    // show spinner
    this.showSpinnerChanged.emit(true);

    return this.http.put<ISearchResponse>(environment.apiUrl, this.requestData)
      .subscribe(sugestionsResults => {
        // emit search
        this.searchChanged.emit(sugestionsResults as ISearchResponse);

        // hide spinner
        this.showSpinnerChanged.emit(false);
      });
  }

}
