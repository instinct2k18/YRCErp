import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinancialYearService } from './../../../home/masters/financial-year/financial-year.service';
import { Subscription } from 'rxjs';
import { FinancialYear } from './../../../home/masters/financial-year/financial-year.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-financial-year-edit',
  templateUrl: './financial-year-edit.component.html',
  styleUrls: ['./financial-year-edit.component.css']
})
export class FinancialYearEditComponent implements OnInit, OnDestroy {

  updated = false;

  fYearId = null;

  fYearFieldValue = null;

  fYear: FinancialYear[] = [];
  private fYearSub: Subscription;

  constructor(
    public financialYearService: FinancialYearService
  ) { }

  ngOnInit() {
    this.financialYearService.getFinYear();
    this.fYearSub = this.financialYearService.getFinancialYearUpdatedListener()
      .subscribe((fYear) => {
        this.fYear = fYear;
      });
  }

  onSelectFnYear(event) {
    this.fYearId = event.target['value'];
    this.fYear.forEach(a => {
      if (this.fYearId === a.id) {
        this.fYearFieldValue = a.year;
      }
    });
  }

  onUpdateFinancialYear(form: NgForm) {
    const financialYear: FinancialYear = { id: this.fYearId, year: form.value.financial_year };
    this.financialYearService.updateFinancialYear(financialYear);
    this.updated = true;
    form.reset();
  }

  ngOnDestroy() {
    if (this.fYearSub) {
      this.fYearSub.unsubscribe();
    }
  }

}
