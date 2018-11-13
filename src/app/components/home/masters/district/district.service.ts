import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { District } from './district.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private district: District[] = [];
  private districtSubject = new Subject<District[]>();

  constructor(private http: HttpClient) { }

  getDistrict() {
    this.http.get<{message: string; district: any}>('http://localhost:3000/api/district')
      .pipe(map((districtData) => {
        return districtData.district.map(district => {
          return {
            id: district._id,
            district_name: district.district_name
          };
        });
      }))
      .subscribe( district => {
        this.district = district;
        this.districtSubject.next([...this.district]);
      });
  }

  getDistrictUpdatedListener() {
    return this.districtSubject.asObservable();
  }

  addDistrict(district: District) {
    this.district.push(district);
    this.districtSubject.next([...this.district]);
    this.http.post<{message: string}>('http://localhost:3000/api/district', district)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }
}
