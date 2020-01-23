import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISearchRequest, ISearchResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchChanged = new EventEmitter<ISearchResponse>();

  requestData: ISearchRequest = {
    query: '',
  };

  sortOptions: string[] = [
    'meetup_id',
    '-meetup_id',
    'created',
    '-created',
    'members',
    '-members',
  ];

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
