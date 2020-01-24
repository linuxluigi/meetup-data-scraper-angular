import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { ImprintPageComponent } from './imprint-page/imprint-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'imprint', component: ImprintPageComponent },
  { path: 'imprint', component: PrivacyPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
