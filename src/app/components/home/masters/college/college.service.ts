import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { College } from './college.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private college: College[] = [];
  private collegeSubject = new Subject<College[]>();

  constructor(private http: HttpClient) { }

  getCollege() {
    this.http.get<{message: string; college: any}>(BACKEND_URL + '/college')
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
    this.http.post<{message: string}>(BACKEND_URL + '/college', college)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }

  updateCollege(college: College) {
    this.http.put<{ message: string }>(
      BACKEND_URL + '/college/edit', college)
      .subscribe(res => {
        console.log(res.message);
      });
  }

  deleteCollege(collegeId) {
    const url = `${BACKEND_URL}/college/delete?${collegeId}`;
    this.http.delete<{ message: string }>(url)
      .subscribe(res => {
        console.log(res.message);
      });
  }

}
