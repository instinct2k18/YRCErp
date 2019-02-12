import { Component, OnInit, OnDestroy } from '@angular/core';
import { District } from '../../masters/district/district.model';
import { Subscription } from 'rxjs';
import { DistrictService } from '../../masters/district/district.service';
import { NgForm } from '@angular/forms';
import { College } from '../../masters/college/college.model';
import { CollegeService } from '../../masters/college/college.service';
import { Voucher } from '../../transactions/voucher/voucher.model';
import { VoucherService } from '../../transactions/voucher/voucher.service';
import { FinancialYear } from '../../masters/financial-year/financial-year.model';
import { AcademicYear } from '../../masters/academic-year/academic-year.model';
import { FinancialYearService } from '../../masters/financial-year/financial-year.service';
import { AcademicYearService } from '../../masters/academic-year/academic-year.service';

import { IncomeHeads } from '../../masters/income-heads/income-heads.model';
import { IncomeHeadsService } from '../../masters/income-heads/income-heads.service';
import { Router } from '@angular/router';
import { Reports } from '../reports.model';
import { ReportsService } from '../reports.service';
import { PdfgenerateService } from '../pdfgenerate.service';
import { DatePipe } from '@angular/common';

class FormData1 {
  collegeName = null;
  clgAddr = null;
  yrc_reg_no = null;
  voucher_no = null;
  current_date = null;
  received_date = null;
  bank_details = null;
}

class FormData2 {
  collegeName = null;
  clgAddr = null;
  yrc_reg_no = null;
  voucher_no = null;
  current_date = null;
  received_date = null;
  bank_details = null;
  sfee = null;
  student_count = null;
}

class FormData3 {
  collegeName = null;
  clgAddr = null;
  yrc_reg_no = null;
  voucher_no = null;
  current_date = null;
  received_date = null;
  bank_details = null;
  fee = null;
  student_count = null;
}

class FormData4 {
  collegeName = null;
  clgAddr = null;
  yrc_reg_no = null;
  voucher_no = null;
  current_date = null;
  received_date = null;
  bank_details = null;
  fee = null;
  student_count = null;
}

@Component({
  selector: 'app-district-wise',
  templateUrl: './district-wise.component.html',
  styleUrls: ['./district-wise.component.css']
})
export class DistrictWiseComponent implements OnInit , OnDestroy {

  form1Data = new FormData1 ;
  form2Data = new FormData2 ;
  form3Data = new FormData3 ;
  form4Data = new FormData4 ;

  distFlag = false;
  clgFlag = false;
  finFlag = false;
  acFlag = false;
  iHFlag = false;

  formType = null;
  districtId = null;
  collegeId = null;
  voucherId = null;
  finYearId = null;
  acYearId = null;
  incHeadId = null;

  district: District[] = [];
  private districtSub: Subscription;

  college: College[] = [];
  private collegeSub: Subscription;

  voucher: Voucher[] = [];
  private voucherSub: Subscription;

  finYear: FinancialYear[] = [];
  private finYearSub: Subscription;

  acYear: AcademicYear[] = [];
  private acYearSub: Subscription;

  incHead: IncomeHeads[] = [];
  private incHeadSub: Subscription;

  report: Reports[] = [];
  private reportSub: Subscription;

  iHList = [];

  paid = false;
  notPaid = false;

  constructor(
    public districtService: DistrictService,
    public collegeService: CollegeService,
    public voucherService: VoucherService,
    public finYearService: FinancialYearService,
    public acYearService: AcademicYearService,
    public incHeadService: IncomeHeadsService,
    public reportService: ReportsService,
    public pdfService: PdfgenerateService,
    private datePipe: DatePipe,
    public router: Router
  ) { }

  ngOnInit() {
    this.districtService.getDistrict();
    this.districtSub = this.districtService.getDistrictUpdatedListener()
      .subscribe((dist) => {
        this.district = dist;
      });

    // this.collegeService.getCollege();
    // this.collegeSub = this.collegeService.getCollegeUpdatedListener()
    //   .subscribe((clg) => {
    //     this.college = clg;
    //   });

    this.voucherService.getVoucher();
    this.voucherSub = this.voucherService.getVoucherUpdatedListener()
      .subscribe((vouc) => {
        this.voucher = vouc;
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

  onSelectDistrict(event) {
    this.districtId = event.target['value'];
    this.college = [];
    this.collegeService.getCollege();
    this.collegeSub = this.collegeService.getCollegeUpdatedListener()
      .subscribe((clg) => {
        clg.map((c) => {
          if (c.district === this.districtId) {
            this.college.push(c);
          }
        });
      });
    this.distFlag = true;
  }

  onSelectCollege(event) {
    this.collegeId = event.target['value'];
    this.clgFlag = true;
  }

  onSelectFinYear(event) {
    this.finYearId = event.target['value'];
    this.finFlag = true;
  }

  onSelectAcYear(event) {
    this.iHFlag = false;
    this.acYearId = event.target['value'];
    this.acFlag = true;
    this.voucher.forEach((v) => {
      if (v.college_name === this.collegeId) {
        this.incHead.forEach((ih) => {
          if (v.income_head === ih.id && ih.income_head.toLowerCase() === 'college registration fee') {
            this.paid = true;
            this.notPaid = false;
          } else {
            this.notPaid = true;
          }
        });
      }
      if (v.college_name === this.collegeId && v.financial_year === this.finYearId && v.academic_year === this.acYearId) {
        this.college.forEach((clg) => {
          if (clg.id === this.collegeId) {
            this.form1Data.clgAddr = this.form2Data.clgAddr = this.form3Data.clgAddr = this.form4Data.clgAddr = clg.address;
            this.form1Data.yrc_reg_no = this.form2Data.yrc_reg_no = this.form3Data.yrc_reg_no = this.form4Data.yrc_reg_no = clg.yrc_reg_no;
            this.form1Data.collegeName = this.form2Data.collegeName =
            this.form3Data.collegeName = this.form4Data.collegeName  = clg.college_name;
          }
        });
        this.incHead.forEach((i) => {
          if (v.income_head === i.id) {
            this.iHList.push(i.income_head);
            this.iHFlag = true;
          }
        });
      }
    });
  }

  onSelectFormType(event) {
    this.formType = event.target['value'];
    this.reportService.generateReports(this.collegeId, this.acYearId, this.finYearId);
    this.reportSub = this.reportService.getReportsUpdatedListener()
      .subscribe((report) => {
        this.report = report;
      });
  }

  onGenerateForm(form: NgForm) {
    const date = Date();
    this.form1Data.current_date = this.form2Data.current_date =
    this.form3Data.current_date = this.form4Data.current_date = this.datePipe.transform(date, 'dd/MM/yyyy');

    if (this.formType === 'form1') {
      this.report.forEach((doc => {
        this.form1Data.bank_details = doc.bank_details;
        this.form1Data.received_date = doc.received_date;
        this.form1Data.voucher_no = doc.voucher_no;
      }));

      this.pdfService.form1(
        this.form1Data.collegeName, this.form1Data.clgAddr, this.form1Data.yrc_reg_no, this.form1Data.voucher_no,
        this.form1Data.current_date, this.form1Data.received_date, this.form1Data.bank_details
        );
      this.reset();
    } else if (this.formType === 'form2') {
      this.report.forEach((doc) => {
        this.incHead.forEach(ih => {
          if (doc.income_head === ih.id && ih.income_head.toLowerCase() === 'student membership fee') {
            this.form2Data.bank_details = doc.bank_details;
            this.form2Data.received_date = doc.received_date;
            this.form2Data.voucher_no = doc.voucher_no;
            this.form2Data.student_count = doc.student_count;
            this.form2Data.sfee = doc.fee;
          }
        });
      });
      this.pdfService.form2(
        this.form2Data.collegeName, this.form2Data.clgAddr, this.form2Data.yrc_reg_no, this.form2Data.voucher_no,
        this.form2Data.current_date, this.form2Data.received_date, this.form2Data.bank_details,
        this.form2Data.student_count, this.form2Data.sfee
      );
      this.reset();
    } else if (this.formType === 'form3') {
      this.report.forEach((doc => {
        this.form3Data.bank_details = doc.bank_details;
        this.form3Data.received_date = doc.received_date;
        this.form3Data.voucher_no = doc.voucher_no;
        this.form3Data.student_count = doc.student_count;
        this.form3Data.fee = doc.fee;
      }));

      this.pdfService.form3(
        this.form3Data.collegeName, this.form3Data.clgAddr, this.form3Data.yrc_reg_no, this.form3Data.voucher_no,
        this.form3Data.current_date, this.form3Data.received_date, this.form3Data.bank_details,
        this.form3Data.student_count, this.form3Data.fee
      );
      this.reset();
    } else if (this.formType === 'form4') {
      this.report.forEach((doc => {
        this.form4Data.bank_details = doc.bank_details;
        this.form4Data.received_date = doc.received_date;
        this.form4Data.voucher_no = doc.voucher_no;
        this.form4Data.student_count = doc.student_count;
        this.form4Data.fee = doc.fee;
      }));
      this.pdfService.form4(
        this.form4Data.collegeName, this.form4Data.clgAddr, this.form4Data.yrc_reg_no, this.form4Data.voucher_no,
        this.form4Data.current_date, this.form4Data.received_date, this.form4Data.bank_details,
        this.form4Data.student_count, this.form4Data.fee
      );
      this.reset();
    }
  }

  reset() {
    this.router.navigateByUrl('reports', {skipLocationChange: true})
      .then(() => this.router.navigate(['reports/district-wise']));
  }

  ngOnDestroy() {
    if (this.districtSub) {
      this.districtSub.unsubscribe();
    }
    if (this.collegeSub) {
      this.collegeSub.unsubscribe();
    }
    if (this.voucherSub) {
      this.voucherSub.unsubscribe();
    }
    if (this.incHeadSub) {
      this.incHeadSub.unsubscribe();
    }
    if (this.acYearSub) {
      this.acYearSub.unsubscribe();
    }
    if (this.finYearSub) {
      this.finYearSub.unsubscribe();
    }
    if (this.reportSub) {
      this.reportSub.unsubscribe();
    }
  }
}
