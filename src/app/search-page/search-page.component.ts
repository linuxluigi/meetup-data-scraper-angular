import { Component, OnInit } from '@angular/core';
import { ISearchResponse, ISearchRequest } from '../services/interfaces';
import { SearchService } from '../services/search.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  showSpinner = true;
  searchResponse: ISearchResponse;

  // pagination
  searchLimit = 10;
  searchOffset = 0;

  constructor(private searchService: SearchService) {

    // spinner listener
    this.searchService.showSpinnerChanged
      .subscribe(
        (showSpinner: boolean) => {
          this.showSpinner = showSpinner;
        }
      );

    // search response listener
    this.searchService.searchChanged
      .subscribe(
        (searchResponse: ISearchResponse) => {
          this.searchResponse = searchResponse;
        }
      );

  }

  ngOnInit() { }

  onPaginatorChanged(pageEvent: PageEvent) {
    /*
    set pagination
    */
    this.searchLimit = pageEvent.pageSize;
    this.searchOffset = pageEvent.pageIndex;

    this.searchService.requestData.limit = this.searchLimit;
    this.searchService.requestData.page = this.searchOffset;

    this.searchService.fetchSearch();
  }

}
