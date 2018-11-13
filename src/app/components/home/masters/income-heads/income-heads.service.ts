import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IncomeHeads } from './income-heads.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeHeadsService {
  private incomeHeads: IncomeHeads[] = [];
  private incomeHeadsSubject = new Subject<IncomeHeads[]>();

  constructor(private http: HttpClient) { }

  getIncomeHeads() {
    this.http.get<{message: string; incomeHeads: any}>('http://localhost:3000/api/income_heads')
      .pipe(map((incomeHeadsData) => {
        return incomeHeadsData.incomeHeads.map(incomeHeads => {
          return {
            id: incomeHeads._id,
            incomeHeads_name: incomeHeads.incomeHeads_name
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
    this.http.post<{message: string}>('http://localhost:3000/api/income_heads', incomeHeads)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }
}
