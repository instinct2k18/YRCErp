import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Voucher } from './voucher.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private voucher: Voucher[] = [];
  private voucherSubject = new Subject<Voucher[]>();

  constructor(private http: HttpClient) { }

  getVoucher() {
    this.http.get<{message: string; voucher: any}>(BACKEND_URL + '/voucher')
      .pipe(map((voucherData) => {
        return voucherData.voucher.map(voucher => {
          return {
            id: voucher._id,
            voucher_no: voucher.voucher_no,
            college_name: voucher.college_name,
            income_head: voucher.income_head,
            fee: voucher.fee,
            financial_year: voucher.financial_year,
            academic_year: voucher.academic_year,
            received_date: voucher.received_date,
            bank_details: voucher.bank_details,
            student_count: voucher.student_count
          };
        });
      }))
      .subscribe( voucher => {
        this.voucher = voucher;
        this.voucherSubject.next([...this.voucher]);
      });
  }

  getVoucherUpdatedListener() {
    return this.voucherSubject.asObservable();
  }

  addVoucher(voucher: Voucher) {
    this.voucher.push(voucher);
    this.voucherSubject.next([...this.voucher]);
    this.http.post<{message: string}>(BACKEND_URL + '/voucher', voucher)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }
}
