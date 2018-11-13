import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { College } from './college.model';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private college: College[] = [];
  private collegeSubject = new Subject<College[]>();

  constructor(private http: HttpClient) { }

  getCollege() {
    this.http.get<{message: String; college: any}>('http://localhost:3000/api/college')
      .pipe(map((collegeData) => {
        return collegeData.college.map(college => {
          return {
            id: college._id,
            college_name: college.college_name
          };
        });
      }))
      .subscribe( college => {
        this.college = college;
        this.collegeSubject.next([...this.college]);
      });
  }

  getCollegeUpdatedListener() {
    return this.collegeSubject.asObservable();
  }

  addCollege(college: College) {
    this.college.push(college);
    this.collegeSubject.next([...this.college]);
    this.http.post<{message: String}>('http://localhost:3000/api/college', college)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }
}
