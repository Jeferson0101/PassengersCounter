import { take } from 'rxjs/operators';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Loader } from "@googlemaps/js-api-loader";
import { DataServiceService } from './services/data-service.service';

var map: google.maps.Map;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('gmap', {static: true}) gmapElement: ElementRef;
  public infoWindow: any;


  constructor(private dataService: DataServiceService){

  }

  public ngAfterViewInit() {
    this.getData();
  }

  public getData(): void {

    this.dataService.getBus().pipe(
      take(1),
    ).subscribe((response) => {
      let loader = new Loader({
        apiKey: 'AIzaSyDphkj5RATRzmQr7eG4u9Em5egdeM3nwKc'
      })
  
      loader.load().then(() => {
          map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -27.814696, lng: -50.327032},
          zoom: 8
          })

          console.log(response);
          response.forEach((value) => {
            const marker = new google.maps.Marker({
              position: {lat: parseFloat(value.coordinates.lat),
              lng: parseFloat(value.coordinates.lng)},
              map: map,
              title: 'Bus'
            });
            const contentString =
            `<h3 id="firstHeading">Ocupação: ${value.occupation}<h3>` +
            `<h3 id="secondHeading">Limite: ${value.passengerslimit}<h3>`;

            const infowindow = new google.maps.InfoWindow({
              content: contentString,
            });

            marker.addListener("click", () => {
              infowindow.open(map, marker);
            });
          })
      });
    })
  }
}
