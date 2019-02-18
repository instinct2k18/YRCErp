import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FinancialYear } from './../../../home/masters/financial-year/financial-year.model';
import { FinancialYearService } from 'src/app/components/home/masters/financial-year/financial-year.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-financial-year-delete',
  templateUrl: './financial-year-delete.component.html',
  styleUrls: ['./financial-year-delete.component.css']
})
export class FinancialYearDeleteComponent implements OnInit, OnDestroy {

  deleted = false;
  fcYearId = null;
  fcYear: FinancialYear[] = [];
  private acYearSub: Subscription;

  constructor(public financialYearService: FinancialYearService) { }

  ngOnInit() {
    this.financialYearService.getFinYear();
    this.acYearSub = this.financialYearService.getFinancialYearUpdatedListener()
      .subscribe((fcYear) => {
        this.fcYear = fcYear;
      });
  }

  onSelectFcYear(event) {
    this.fcYearId = event.target['value'];
  }

  onDeleteFinancialYear(form: NgForm) {
    this.financialYearService.deleteFinancialYear(this.fcYearId);
    this.deleted = true;
    form.reset();
  }

  ngOnDestroy() {
    if (this.acYearSub) {
      this.acYearSub.unsubscribe();
    }
  }

}
