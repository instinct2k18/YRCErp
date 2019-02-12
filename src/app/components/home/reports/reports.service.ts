import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Reports } from './reports.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private reports: Reports[] = [];
  private reportsSubject = new Subject<Reports[]>();

  constructor(private http: HttpClient) { }

  getReportsUpdatedListener() {
    return this.reportsSubject.asObservable();
  }

  generateReports(collegeId, acYearId, fYearId) {
    const url = 'http://localhost:3000/api/reports?' + 'collegeId=' + collegeId + '&acYearId=' + acYearId + '&fYearId=' + fYearId;
    this.http.get<{message: string; reports: any}>(url)
      .pipe(map((reportData) => {
        return reportData.reports.map(report => {
          return {
            receipt_no : report.receipt_no,
            receipt_enclosed_date : report.receipt_enclosed_date,
            voucher_no: report.voucher_no,
            college_name: report.college_name,
            fee: report.fee,
            income_head : report.income_head,
            financial_year: report.financial_year,
            academic_year: report.academic_year,
            received_date: report.received_date,
            bank_details: report.bank_details,
            student_count: report.student_count
          };
        });
      }))
      .subscribe( (report) => {
        this.reports = report;
        this.reportsSubject.next([...this.reports]);
      }
      );
  }
}
