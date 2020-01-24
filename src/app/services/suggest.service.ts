import { Injectable, EventEmitter } from '@angular/core';
import { ISuggestResponse } from './interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuggestService {

  suggestionsChanged = new EventEmitter<ISuggestResponse>();

  constructor(private http: HttpClient) { }

  fetchSugestions(query: string) {
    /*
    fetch suggestion from api server
    */
    return this.http.put<ISuggestResponse>(environment.apiUrl + 'suggest/', { query })
      .subscribe(sugestionsResults => {
        // emit suggestions
        this.suggestionsChanged.emit(sugestionsResults as ISuggestResponse);
      });
  }

}
