import { Component, OnInit, OnDestroy } from '@angular/core';
import { University } from '../../masters/university/university.model';
import { Subscription } from 'rxjs';
import { UniversityService } from '../../masters/university/university.service';
import { NgForm } from '@angular/forms';
import { College } from '../../masters/college/college.model';
import { CollegeService } from '../../masters/college/college.service';
import { Voucher } from '../../transactions/voucher/voucher.model';
import { VoucherService } from '../../transactions/voucher/voucher.service';
import { FinancialYear } from '../../masters/financial-year/financial-year.model';
import { AcademicYear } from '../../masters/academic-year/academic-year.model';
import { FinancialYearService } from '../../masters/financial-year/financial-year.service';
import { AcademicYearService } from '../../masters/academic-year/academic-year.service';

// JsPdf Dependency
import * as jsPdf from 'jspdf';
import { IncomeHeads } from '../../masters/income-heads/income-heads.model';
import { IncomeHeadsService } from '../../masters/income-heads/income-heads.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-university-wise',
  templateUrl: './university-wise.component.html',
  styleUrls: ['./university-wise.component.css']
})

export class UniversityWiseComponent implements OnInit , OnDestroy {

  uniFlag = false;
  clgFlag = false;
  finFlag = false;
  acFlag = false;
  iHFlag = false;

  clgAddr = null;

  universityId = null;
  collegeId = null;
  voucherId = null;
  finYearId = null;
  acYearId = null;
  incHeadId = null;

  university: University[] = [];
  private universitySub: Subscription;

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

  iHList = [];

  constructor(
    public universityService: UniversityService,
    public collegeService: CollegeService,
    public voucherService: VoucherService,
    public finYearService: FinancialYearService,
    public acYearService: AcademicYearService,
    public incHeadService: IncomeHeadsService,
    public router: Router
  ) { }

  ngOnInit() {
    this.universityService.getUniversity();
    this.universitySub = this.universityService.getUniversityUpdatedListener()
      .subscribe((dist) => {
        this.university = dist;
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

  onSelectUniversity(event) {
    this.universityId = event.target['value'];
    this.college = [];
    this.collegeService.getCollege();
    this.collegeSub = this.collegeService.getCollegeUpdatedListener()
      .subscribe((clg) => {
        clg.map((c) => {
          if (c.affiliation === this.universityId) {
            this.college = clg;
          }
        });
      });
    this.uniFlag = true;
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
      if (v.college_name === this.collegeId && v.financial_year === this.finYearId && v.academic_year === this.acYearId) {
        this.college.forEach((clg) => {
          if (clg.id === this.collegeId) {
            this.clgAddr = clg.address;
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

  onGenerateForm(form: NgForm) {
    const doc = new jsPdf();
    // Header Part
    doc.text('The Principal', 10, 10);
    doc.text(form.value.v_clg_name, 10, 20);
    doc.text(this.clgAddr, 10, 30);

    // Letter
    doc.text('Dear Sir / Madam', 10, 50);

    doc.text('Sub:-Registration of Youth Red Cross', 10, 60);
    doc.text('Ref:-Your Letter No:Nil Dt: Nil', 10, 70);
    doc.text('***********', 10, 80);

    doc.text('We acknowledge with thanks the receipt of Bank Draft/ChequeNo:151840', 10, 100);
    doc.text('Dtd: 16/11/18, Bank of  Baroda, New BEL Road, Bangalore  for Rs.1,500/-', 10, 110);
    doc.text('(Rupees One Thousand Five Hundred  Only) towards onetime payment of College Registration.', 10, 120);

    doc.text('Receipt No: 7849  Dtd: 27/11/2018 for Rs.1,500/- is enclosed.', 10, 130);

    doc.text('Participation of students in Red Cross activities promotes understanding ', 10, 140);
    doc.text('and accepting of civic responsibility and maintaining a spirit of friendliness.', 10, 150);

    doc.text('Thanking you,', 10, 160);

    doc.text('Yours truly,', 10, 170);
    doc.text('General Secretary', 10, 180);

    doc.save(form.value.v_clg_name + '-' + form.value.v_ac_year + '.pdf');

    this.router.navigateByUrl('reports', {skipLocationChange: true})
      .then(() => this.router.navigate(['reports/university-wise']));
  }

  reset() {
    this.router.navigateByUrl('reports', {skipLocationChange: true})
      .then(() => this.router.navigate(['reports/university-wise']));
  }

  ngOnDestroy() {
    if (this.universitySub) {
      this.universitySub.unsubscribe();
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
  }
}
