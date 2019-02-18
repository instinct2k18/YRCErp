import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { FinancialYear } from './financial-year.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FinancialYearService {
  private finYear: FinancialYear[] = [];
  private finYearSubject = new Subject<FinancialYear[]>();

  constructor(private http: HttpClient) { }

  getFinYear() {
    this.http
      .get<{ message: string; finYear: any }>(
        BACKEND_URL + '/financial_year'
      )
      .pipe(map((finYearData) => {
        return finYearData.finYear.map(finYear => {
          return {
            year: finYear.year,
            id: finYear._id
          };
        });
      }))
      .subscribe(finYear => {
        this.finYear = finYear;
        this.finYearSubject.next([...this.finYear]);
      });
  }

  getFinancialYearUpdatedListener() {
    return this.finYearSubject.asObservable();
  }

  addFinancialYear(financial_year) {
    const financialYear: FinancialYear = { id: null, year: financial_year };
    this.finYear.push(financialYear);
    this.finYearSubject.next([...this.finYear]);
    this.http.post<{message: string}>(BACKEND_URL + '/financial_year', financialYear)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }

  deleteFinancialYear(financialYearId) {
    const url = `${BACKEND_URL}/financial_year/delete?${financialYearId}`;
    this.http.delete<{ message: string }>(url)
      .subscribe(res => {
        console.log(res.message);
      });
  }

  updateFinancialYear(financial_year: FinancialYear) {
    this.http.put<{ message: string }>(
      BACKEND_URL + '/financial_year/edit', financial_year)
      .subscribe(res => {
        console.log(res.message);
      });
  }

}
