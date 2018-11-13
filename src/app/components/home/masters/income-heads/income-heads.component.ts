import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { AcademicYear } from '../academic-year/academic-year.model';
import { FinancialYear } from '../financial-year/financial-year.model';
import { College } from '../college/college.model';
import { AcademicYearService } from '../academic-year/academic-year.service';
import { FinancialYearService } from '../financial-year/financial-year.service';
import { CollegeService } from '../college/college.service';
import { IncomeHeadsService } from './income-heads.service';
import { IncomeHeads } from './income-heads.model';


@Component({
  selector: 'app-income-heads',
  templateUrl: './income-heads.component.html',
  styleUrls: ['./income-heads.component.css']
})
export class IncomeHeadsComponent implements OnInit, OnDestroy {

  collegeId = null;
  academicYearId = null;
  financialYearId = null;

  academicYear: AcademicYear[] = [];
  private academicYearSub: Subscription;

  finYear: FinancialYear[] = [];
  private finYearSub: Subscription;

  college: College[] = [];
  private collegeSub: Subscription;

  constructor(
    public academicYearService: AcademicYearService,
    public financialYearService: FinancialYearService,
    public collegeService: CollegeService,
    public incomeService: IncomeHeadsService
  ) { }

  ngOnInit() {
    this.academicYearService.getAcademicYear();
    this.academicYearSub = this.academicYearService.getAcademicYearUpdatedListener()
      .subscribe((academicYear) => {
        this.academicYear = academicYear;
      });
    this.financialYearService.getFinYear();
    this.finYearSub = this.financialYearService.getFinancialYearUpdatedListener()
      .subscribe((finYear) => {
        this.finYear = finYear;
      });
    this.collegeService.getCollege();
    this.collegeSub = this.collegeService.getCollegeUpdatedListener()
      .subscribe((college) => {
        this.college = college;
      });
  }

  ngOnDestroy() {
    this.academicYearSub.unsubscribe();
    this.finYearSub.unsubscribe();
    this.collegeSub.unsubscribe();
  }

  onAddIncomeHead(form: NgForm) {
    const income: IncomeHeads = {
      id: null,
      college_name: this.collegeId,
      college_registration_fee: form.value.col_reg_fee,
      student_membership_fee: form.value.std_fee,
      academic_year: this.academicYearId,
      financial_year: this.financialYearId
    };
    this.incomeService.addIncomeHeads(income);
  }

  onSelectCollege(event) {
    this.collegeId = event.target['value'];
  }

  onSelectAcademicYear(event) {
    this.academicYearId = event.target['value'];
  }

  onSelectFinancialYear(event) {
    this.financialYearId = event.target['value'];
  }
}
