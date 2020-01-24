import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ImprintPageComponent } from './imprint-page/imprint-page.component';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SetLocationComponent } from './search-page/set-location/set-location.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
    SearchPageComponent,
    PageNotFoundComponent,
    SearchFieldComponent,
    SetLocationComponent,
  ],
  entryComponents: [
    SetLocationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
