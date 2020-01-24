import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';
import { INominatim, ISetLocation } from '../services/interfaces';
import { NominatimService } from '../services/nominatim.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.component.html',
  styleUrls: ['./set-location.component.scss']
})
export class SetLocationComponent implements OnInit {

  showPorgressbar = false;
  nominatimResponse: [INominatim];

  searchQuery = '';

  map;
  markerCircle;

  distance = 500;

  constructor(
    public dialogRef: MatDialogRef<SetLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISetLocation,
    private nominatimService: NominatimService,
    private searchService: SearchService
  ) {
    // Porgressbar listener
    this.nominatimService.showProgressbarChanged
      .subscribe(
        (showPorgressbar: boolean) => {
          this.showPorgressbar = showPorgressbar;
        }
      );

    // nominatim response listener
    this.nominatimService.nominatimChanged
      .subscribe(
        (nominatimResponse: [INominatim]) => {
          this.nominatimResponse = nominatimResponse;
        }
      );
  }

  ngOnInit() {
    this.map = L.map('nominatim-map').setView([51.030726, 13.730136], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  onSubmit(form: NgForm) {
    this.nominatimService.fetchNoinatim(form.value.location);
  }

  onSelectLocation(item: INominatim, form: NgForm) {
    this.data.distance = form.value.distance.toString() + 'm';
    this.data.lat = Number(item.lat);
    this.data.lon = Number(item.lon);
    this.data.name = item.display_name;

    if (this.markerCircle) {
      this.map.removeLayer(this.markerCircle);
    }

    this.markerCircle = L.circle([Number(item.lat), Number(item.lon)], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: form.value.distance
    }).addTo(this.map);

    this.map.setView([Number(item.lat), Number(item.lon)], 10);
  }

  onRemoveLocation() {
    this.data = {} as ISetLocation;
  }

}
