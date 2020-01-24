import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as L from 'leaflet';
import { IGroup, ISearchResponse, ISetLocation } from '../services/interfaces';
import { SearchService } from '../services/search.service';
import { SetLocationComponent } from './set-location/set-location.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  showSpinner = true;
  searchResponse: ISearchResponse;

  showMap = false;

  // leafeat map
  map;
  markers: any[] = [];

  // pagination
  searchLimit = 10;
  searchOffset = 0;

  // datepicker
  fromDate: Date;
  toDate: Date;

  // sort
  sortOptions: string[] = this.searchService.sortOptions;
  sortOption: string;

  // search location
  searchLocation: ISetLocation = {} as ISetLocation;

  constructor(private searchService: SearchService, public dialog: MatDialog) {

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

          this.setMapMarker();
        }
      );

  }

  ngOnInit() {
    this.map = L.map('search-map').setView([51.030726, 13.730136], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

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

  openLocationDialog(): void {
    this.dialog.open(SetLocationComponent, {
      data: this.searchLocation
    });
  }

  onChangeMapView(): void {
    this.showMap = !this.showMap;
  }

  onSelectitem(group: IGroup) {
    this.map.setView([group.location.lat, group.location.lon], 13);
  }

  setMapMarker() {
    // set map marker
    const map = this.map;

    // assets/img/map/icon-157354.svg
    const mapMarkerIcon = L.icon({
      iconUrl: 'assets/img/map/icon-157354.svg',
      iconSize: [19, 47],
      popupAnchor: [-2, -38],
    });

    const markers: any[] = [];
    this.searchResponse.results.forEach(group => {
      group.venues.forEach(venue => {
        const marker = L.marker([venue.location.lat, venue.location.lon], { icon: mapMarkerIcon }).addTo(map);
        marker.bindPopup(venue.name + ': <a target="_blank" href="' + group.link + '">' + group.name + '</a>');
        markers.push(marker);
      });
    });

    this.markers.forEach(marker => {
      map.removeLayer(marker);
    });

    this.markers = markers;

    this.map.setView([this.searchResponse.map_center.lat, this.searchResponse.map_center.lon], 5);
  }

  onRemoveLocation() {
    this.removeLocation();
    this.searchLocation = {} as ISetLocation;
  }

  removeLocation() {
    this.searchService.requestData.geo_lat = undefined;
    this.searchService.requestData.geo_lon = undefined;
    this.searchService.requestData.geo_distance = undefined;
  }

  createDateString(date: Date) {
    // add year to date string
    let dateString: string = date.getFullYear().toString();

    dateString += '-';

    // add month to date string
    if (date.getMonth() < 9) {
      dateString += '0';
    }
    dateString += (date.getMonth() + 1).toString();

    dateString += '-';

    // add day to date string
    if (date.getDate() < 10) {
      dateString += '0';
    }
    dateString += date.getDate().toString();

    return dateString;
  }

  onDateChanged() {
    if (this.fromDate) {
      this.searchService.requestData.event_time_gte = this.createDateString(this.fromDate);
    } else {
      this.searchService.requestData.event_time_gte = undefined;
    }

    if (this.toDate) {
      this.searchService.requestData.event_time_lte = this.createDateString(this.toDate);
    } else {
      this.searchService.requestData.event_time_lte = undefined;
    }

    this.searchService.requestData.sort = this.sortOption;
  }

}
