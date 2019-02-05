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
    this.http.get<{message: string; college: any}>('http://localhost:3000/api/college')
      .pipe(map((collegeData) => {
        return collegeData.college.map(college => {
          return {
            id: college._id,
            college_name: college.college_name,
            yrc_reg_no: college.yrc_reg_no,
            address: college.address,
            program_officer: college.program_officer,
            contact_no: college.contact_no,
            email: college.email,
            registered_financial_year: college.registered_financial_year,
            affiliation: college.affiliation,
            district: college.district
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
    this.http.post<{message: string}>('http://localhost:3000/api/college', college)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }
}
