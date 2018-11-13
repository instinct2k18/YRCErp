import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AcademicYear } from './academic-year.model';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {
  private academicYear: AcademicYear[] = [];
  private academicYearSubject = new Subject<AcademicYear[]>();

  constructor(private http: HttpClient) { }

  getAcademicYear() {
    this.http
      .get<{ message: String; academicYear: any }>(
        'http://localhost:3000/api/academic_year'
      )
      .pipe(map((academicYearData) => {
        return academicYearData.academicYear.map(academicYear => {
          return {
            year: academicYear.year,
            id: academicYear._id
          };
        });
      }))
      .subscribe(academicYear => {
        this.academicYear = academicYear;
        this.academicYearSubject.next([...this.academicYear]);
      });
  }

  getAcademicYearUpdatedListener() {
    return this.academicYearSubject.asObservable();
  }

  addAcademicYear(academic_year: AcademicYear) {
    this.http.post<{message: String, id: String}>('http://localhost:3000/api/academic_year', academic_year)
      .subscribe((resposnseData) => {
        academic_year.id = resposnseData.id;
        this.academicYear.push(academic_year);
        this.academicYearSubject.next([...this.academicYear]);
      });
  }
}
