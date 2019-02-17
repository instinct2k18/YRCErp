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
import { PdfgenerateService } from '../../reports/pdfgenerate.service';
import { DatePipe } from '@angular/common';

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
    public incHeadService: IncomeHeadsService,
    private datePipe: DatePipe,
    public pdfService: PdfgenerateService
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

    const date = Date();
    const currentDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    let voucher_no = null;
    let received_date = null;
    let bankDetails = null;
    let student_count = null;
    let fee = null;
    let clg_name = null;
    let clg_address = null;

    this.receipts.forEach((receipt) => {
      voucher_no = receipt.voucher_no;
      received_date = receipt.received_date;
      bankDetails = receipt.bank_details;
      student_count = receipt.student_count;
      fee = receipt.fees;
      clg_name = receipt.clg_name;
      clg_address = receipt.address;
    });
    this.pdfService.generateReceipt(currentDate, voucher_no, received_date, bankDetails, student_count, fee, clg_name, clg_address);
  }

  ngOnDestroy() {
    if (this.collegeSub) {
      this.collegeSub.unsubscribe();
    }
    if (this.finYearSub) {
      this.finYearSub.unsubscribe();
    }
    if (this.acYearSub) {
      this.acYearSub.unsubscribe();
    }
    if (this.receiptSub) {
      this.receiptSub.unsubscribe();
    }
    if (this.incHeadSub) {
      this.incHeadSub.unsubscribe();
    }
  }
}


