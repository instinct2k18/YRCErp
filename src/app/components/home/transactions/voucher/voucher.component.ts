import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { FinancialYear } from '../../masters/financial-year/financial-year.model';
import { College } from '../../masters/college/college.model';
import { IncomeHeads } from '../../masters/income-heads/income-heads.model';
import { AcademicYear } from '../../masters/academic-year/academic-year.model';
import { FinancialYearService } from '../../masters/financial-year/financial-year.service';
import { CollegeService } from '../../masters/college/college.service';
import { IncomeHeadsService } from '../../masters/income-heads/income-heads.service';
import { AcademicYearService } from '../../masters/academic-year/academic-year.service';
import { Voucher } from './voucher.model';
import { VoucherService } from './voucher.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit, OnDestroy {

  added = false;
  collegeId = null;
  incomeHeadId = null;
  finYearId = null;
  acYearId = null;

  college: College[] = [];
  private collegeSub: Subscription;

  incomeHead: IncomeHeads[] = [];
  private incomeHeadSub: Subscription;

  finYear: FinancialYear[] = [];
  private finYearSub: Subscription;

  acYear: AcademicYear[] = [];
  private acYearSub: Subscription;

  constructor(
    public collegeService: CollegeService,
    public incomeHeadService: IncomeHeadsService,
    public finYearService: FinancialYearService,
    public acYearService: AcademicYearService,
    public voucherService: VoucherService
  ) { }

  ngOnInit() {
    this.collegeService.getCollege();
    this.collegeSub = this.collegeService.getCollegeUpdatedListener()
      .subscribe((clg) => {
        this.college = clg;
      });

    this.incomeHeadService.getIncomeHeads();
    this.incomeHeadSub = this.incomeHeadService.getIncomeHeadsUpdatedListener()
      .subscribe((ih) => {
        this.incomeHead = ih;
      });

    this.finYearService.getFinYear();
    this.finYearSub = this.finYearService.getFinancialYearUpdatedListener()
      .subscribe((finYear) => {
        this.finYear = finYear;
      });

    this.acYearService.getAcademicYear();
    this.acYearSub = this.acYearService.getAcademicYearUpdatedListener()
      .subscribe((acYear) => {
        this.acYear = acYear;
      });
  }
  onAddVoucher(form: NgForm) {
    const voucher: Voucher = {
      id: null,
      voucher_no: form.value.voucher_no,
      college_name: this.collegeId,
      income_head: this.incomeHeadId,
      fee: form.value.v_fee,
      financial_year: this.finYearId,
      academic_year: this.acYearId
    };
    this.voucherService.addVoucher(voucher);
    this.added = true;
    form.reset();
  }

  ngOnDestroy() {
    this.collegeSub.unsubscribe();
    this.incomeHeadSub.unsubscribe();
    this.finYearSub.unsubscribe();
    this.acYearSub.unsubscribe();
  }

  onSelectCollege(event) {
    this.collegeId = event.target['value'];
  }

  onSelectIncomeHead(event) {
    this.incomeHeadId = event.target['value'];
  }

  onSelectFinYear(event) {
    this.finYearId = event.target['value'];
  }

  onSelectAcYear(event) {
    this.acYearId = event.target['value'];
  }
}
