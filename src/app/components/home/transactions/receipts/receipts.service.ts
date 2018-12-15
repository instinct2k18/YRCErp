import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Receipts } from './receipts.model';


@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {
  private receipts: Receipts[] = [];
  private receiptsSubject = new Subject<Receipts[]>();

  constructor(private http: HttpClient) { }

  getReceiptsUpdatedListener() {
    return this.receiptsSubject.asObservable();
  }

  generateReceipt(clgId, acYearId, fnYearId) {
    const url = 'http://localhost:3000/api/receipts?clgId=' + clgId + '&acYearId=' + acYearId + '&fnYearId=' + fnYearId;
    this.http.get<{message: string; data: any}>(url)
      .pipe(map((receiptData) => {
        return receiptData.data.map(receipt => {
          return {
            clg_name: receipt.c_name,
            address: receipt.addr,
            fees: receipt.fees
          };
        });
      }))
      .subscribe(res => {
        this.receipts = res;
        this.receiptsSubject.next([...this.receipts]);
      }, error => {
        alert(error.error.message);
      });
  }
}
