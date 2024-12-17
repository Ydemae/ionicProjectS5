import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.scss'],
})
export class RunningComponent  implements OnInit, OnDestroy {

  private watchId: string | null = null;

  private lastLongitude = 0;
  private lastLatitude = 0;

  public totalDistance = 0;
  public stopwatchTime : Date = new Date(0);

  private stopwatchInterval : any;


  public running : boolean = false;


  constructor() { }

  async ngOnInit() {
    Geolocation.requestPermissions();
  }

  formatTime(time : Date){
    return `${(time.getHours()-1).toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`
  }

  async startRunning(){
    this.running = true;
    //Geolocalisation
    const options : PositionOptions = {
      enableHighAccuracy : true
    }

    this.watchId = await Geolocation.watchPosition(options, (data) => { this.ManagePositionChange(data) });

    //Stopwatch

    this.stopwatchInterval = setInterval(() => {
      this.stopwatchTime.setSeconds(this.stopwatchTime.getSeconds() + 1);
    }, 1000);
  }

  stopRunning(){
    this.running = false;

    clearInterval(this.stopwatchInterval);

    this.stopWatchingPosition();
  }

  resetRun(){
    this.lastLatitude = 0;
    this.lastLongitude = 0;
    this.stopwatchTime = new Date(0);
  }

  ManagePositionChange(data : any){
    if (this.lastLatitude != 0 && this.lastLongitude != 0){
      //Updates travelled distance
      this.totalDistance += this.calculateDistance(
        this.lastLatitude,
        this.lastLongitude,
        data.coords.latitude,
        data.coords.longitude
      );
    }

    this.lastLatitude = data.coords.latitude;
    this.lastLongitude = data.coords.longitude;
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    //Calculates distance between to pair latitude/longitude by using the haversine formula
    const R = 6371;
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    return distance;
  }

  stopWatchingPosition(){
    Geolocation.clearWatch({id : this.watchId!});
    this.watchId = null;
  }

  ngOnDestroy() {
    if (this.watchId){
      this.stopWatchingPosition();
    }
  }

}
