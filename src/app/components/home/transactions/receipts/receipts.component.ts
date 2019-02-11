import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { College } from '../../masters/college/college.model';
import { Subscription } from 'rxjs';
import { CollegeService } from '../../masters/college/college.service';
import { FinancialYearService } from '../../masters/financial-year/financial-year.service';
import { AcademicYearService } from '../../masters/academic-year/academic-year.service';
import { FinancialYear } from '../../masters/financial-year/financial-year.model';
import { AcademicYear } from '../../masters/academic-year/academic-year.model';
import { ReceiptsService } from './receipts.service';
import { Receipts } from './receipts.model';
import { IncomeHeads } from '../../masters/income-heads/income-heads.model';
import { IncomeHeadsService } from '../../masters/income-heads/income-heads.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit, OnDestroy {

  collegeId = null;
  finYearId = null;
  acYearId = null;
  incHeadId = null;
  notFirst = false;

  college: College[] = [];
  private collegeSub: Subscription;

  finYear: FinancialYear[] = [];
  private finYearSub: Subscription;

  acYear: AcademicYear[] = [];
  private acYearSub: Subscription;

  receipts: Receipts[] = [];
  private receiptSub: Subscription;

  incHead: IncomeHeads[] = [];
  private incHeadSub: Subscription;

  constructor(
    public collegeService: CollegeService,
    public finYearService: FinancialYearService,
    public acYearService: AcademicYearService,
    public receiptService: ReceiptsService,
    public incHeadService: IncomeHeadsService
  ) { }

  ngOnInit() {
    this.collegeService.getCollege();
    this.collegeSub = this.collegeService.getCollegeUpdatedListener()
      .subscribe((clg) => {
        this.college = clg;
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

    this.incHeadService.getIncomeHeads();
    this.incHeadSub = this.incHeadService.getIncomeHeadsUpdatedListener()
      .subscribe((incHead) => {
        this.incHead = incHead;
      });
  }

  onSelectCollege(event) {
    this.collegeId = event.target['value'];
  }

  onSelectFinYear(event) {
    this.finYearId = event.target['value'];
  }

  onSelectAcYear(event) {
    this.acYearId = event.target['value'];
  }

  onSelectIncomeHead(event) {
    this.incHeadId = event.target['value'];
  }

  onGenerateReceipt(form: NgForm) {
    this.receiptService.generateReceipt(
      form.value.r_no, form.value.r_date, this.collegeId, this.acYearId, this.finYearId, this.incHeadId, this.notFirst
      );
    this.receiptSub = this.receiptService.getReceiptsUpdatedListener()
    .subscribe((receipt) => {
      this.receipts = receipt;
      });
  }

  ngOnDestroy() {
    this.collegeSub.unsubscribe();
    this.finYearSub.unsubscribe();
    this.acYearSub.unsubscribe();
    if (this.receiptSub) {
      this.receiptSub.unsubscribe();
    }
  }
}


