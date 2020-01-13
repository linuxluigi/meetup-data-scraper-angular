import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  searchQuery: string;
  searchLimit: number;

  constructor(private router: Router) { }

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
      this.router.navigate(['/search'], navigationExtras);
    }
  }

}
