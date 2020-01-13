import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface suggestResponse {
  suggestions: string[];
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchQuery: string;
  searchLimit: number;

  // autocomplete
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) {

    // get search query param
    this.activatedRoute.queryParams.subscribe(params => {
      const date = params.startdate;
      console.log(date); // Print the parameter to the console.
    });

  }

  ngOnInit() {
    this.initAutocomplete();
  }

  // autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private initAutocomplete() {
    // autocomplete
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onSubmit(form: NgForm) {
    /*
    Submit query from to api
    */
    if (form.value.query) {
      const navigationExtras: NavigationExtras = {
        queryParams: { q: form.value.query },
      };
      if (this.searchLimit) {
        navigationExtras.queryParams.limit = this.searchLimit;
      }
      this.router.navigate(['/search'], navigationExtras);
    }

  }

  onPressKey(form: NgForm) {
    /*
    Load on each key press the suggestion from the api
    */
    this.getSugestions(form.value.query);
  }

  getSugestions(query: string) {
    /*
    Get suggestion from api server
    */
    console.log(environment.apiUrl + 'suggest/');
    return this.http.put<suggestResponse>(environment.apiUrl + 'suggest/', { query })
      .subscribe(sugestionsResults => {
        const suggest: suggestResponse = sugestionsResults as suggestResponse;
        this.options = suggest.suggestions;
        this.initAutocomplete();
      });
  }

}
