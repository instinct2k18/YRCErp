import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AcademicYear } from './academic-year.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {
  private academicYear: AcademicYear[] = [];
  private academicYearSubject = new Subject<AcademicYear[]>();

  constructor(private http: HttpClient) { }

  getAcademicYear() {
    this.http
      .get<{ message: string; academicYear: any }>(
        BACKEND_URL + '/academic_year'
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
    this.http.post<{message: string, id: string}>(BACKEND_URL + '/academic_year', academic_year)
      .subscribe((resposnseData) => {
        academic_year.id = resposnseData.id;
        this.academicYear.push(academic_year);
        this.academicYearSubject.next([...this.academicYear]);
      });
  }
}
