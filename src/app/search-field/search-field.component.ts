import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ISuggestResponse } from '../services/interfaces';
import { SearchService } from '../services/search.service';
import { SuggestService } from '../services/suggest.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  searchQuery: string;
  searchLimit: number;

  // autocomplete
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestService: SuggestService,
    private searchService: SearchService
  ) {
    // get search query param
    this.route.queryParams.subscribe((params: Params) => {
      if (params.q) {
        this.searchQuery = params.q;

        // fetch search
        this.searchService.requestData.query = this.searchQuery;
        this.searchService.fetchSearch();
      }
    });

    this.suggestService.suggestionsChanged
      .subscribe(
        (suggestResponse: ISuggestResponse) => {
          this.options = suggestResponse.suggestions;
          this.setAutocomplete();
        }
      );
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.value.query) {
      const navigationExtras: NavigationExtras = {
        queryParams: { q: form.value.query },
      };
      if (this.searchLimit) {
        navigationExtras.queryParams.limit = this.searchLimit;
      }

      // fetch search
      this.searchService.requestData.query = form.value.query;
      this.searchService.fetchSearch();

      this.router.navigate(['/search'], navigationExtras);
    }
  }

  // autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private setAutocomplete() {
    // autocomplete
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onPressKey(form: NgForm) {
    /*
    Load on each key press the suggestion from the api
    */
    this.suggestService.fetchSugestions(form.value.query);
  }

}
