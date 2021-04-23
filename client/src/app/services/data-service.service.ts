import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }


  public getBus(): Observable<any> {
    return this.http.get('http://localhost:3300/bus');
  }

  public getPosition(id): Observable<any> {
    return this.http.get('localhost:3300/getbus', {
      params: { id: id}
    });
  }
}
