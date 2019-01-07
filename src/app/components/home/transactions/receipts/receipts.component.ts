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

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit, OnDestroy {

  collegeId = null;
  finYearId = null;
  acYearId = null;

  college: College[] = [];
  private collegeSub: Subscription;

  finYear: FinancialYear[] = [];
  private finYearSub: Subscription;

  acYear: AcademicYear[] = [];
  private acYearSub: Subscription;

  receipts: Receipts[] = [];
  private receiptSub: Subscription;

  constructor(
    public collegeService: CollegeService,
    public finYearService: FinancialYearService,
    public acYearService: AcademicYearService,
    public receiptService: ReceiptsService
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

  onGenerateReceipt(form: NgForm) {
    this.receiptService.generateReceipt(this.collegeId, this.acYearId, this.finYearId);
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


