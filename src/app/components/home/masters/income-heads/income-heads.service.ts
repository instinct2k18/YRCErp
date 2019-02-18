import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IncomeHeads } from './income-heads.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class IncomeHeadsService {
  private incomeHeads: IncomeHeads[] = [];
  private incomeHeadsSubject = new Subject<IncomeHeads[]>();

  constructor(private http: HttpClient) { }

  getIncomeHeads() {
    this.http.get<{message: string; incomeHead: any}>(BACKEND_URL + '/income_heads')
      .pipe(map((incomeHeadsData) => {
        return incomeHeadsData.incomeHead.map(incomeHeads => {
          return {
            id: incomeHeads._id,
            income_head: incomeHeads.income_head
          };
        });
      }))
      .subscribe( incomeHeads => {
        this.incomeHeads = incomeHeads;
        this.incomeHeadsSubject.next([...this.incomeHeads]);
      });
  }

  getIncomeHeadsUpdatedListener() {
    return this.incomeHeadsSubject.asObservable();
  }

  addIncomeHeads(incomeHeads: IncomeHeads) {
    this.incomeHeads.push(incomeHeads);
    this.incomeHeadsSubject.next([...this.incomeHeads]);
    this.http.post<{message: string}>(BACKEND_URL + '/income_heads', incomeHeads)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }

  deleteIncomeHead(incomeheadId) {
    const url = `${BACKEND_URL}/income_heads/delete?${incomeheadId}`;
    this.http.delete<{ message: string }>(url)
      .subscribe(res => {
        console.log(res.message);
      });
  }
}
