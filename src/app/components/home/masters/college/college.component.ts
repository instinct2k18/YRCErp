import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { FinancialYearService } from 'src/app/components/home/masters/financial-year/financial-year.service';
import { FinancialYear } from '../financial-year/financial-year.model';
import { UniversityService } from '../university/university.service';
import { University } from '../university/university.model';
import { District } from '../district/district.model';
import { DistrictService } from '../district/district.service';
import { CollegeService } from './college.service';
import { College } from './college.model';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit, OnDestroy {

  added = false;
  regYearId = null;
  universityId = null;
  districtId = null;

  finYear: FinancialYear[] = [];
  private finYearSub: Subscription;

  university: University[] = [];
  private universitySub: Subscription;

  district: District[] = [];
  private districtSub: Subscription;

  constructor(
    public finYearService: FinancialYearService,
    public universityService: UniversityService,
    public districtService: DistrictService,
    public collegeService: CollegeService
    ) { }

  ngOnInit() {
    this.finYearService.getFinYear();
    this.finYearSub = this.finYearService.getFinancialYearUpdatedListener()
      .subscribe((finYear) => {
        this.finYear = finYear;
      });
    this.universityService.getUniversity();
    this.universitySub = this.universityService.getUniversityUpdatedListener()
      .subscribe((university) => {
        this.university = university;
      });
    this.districtService.getDistrict();
    this.districtSub = this.districtService.getDistrictUpdatedListener()
      .subscribe((district) => {
        this.district = district;
      });
  }

  ngOnDestroy() {
    if (this.finYearSub) {
      this.finYearSub.unsubscribe();
    }
    if (this.universitySub) {
      this.universitySub.unsubscribe();
    }
    if (this.districtSub) {
      this.districtSub.unsubscribe();
    }
  }

  onAddCollege(form: NgForm) {
    const college: College = {
      id: null,
      yrc_reg_no: form.value.yrc_reg_no,
      college_name: form.value.college_name,
      address: form.value.c_address,
      program_officer: form.value.program_officer,
      contact_no: form.value.c_contact_no,
      email: form.value.c_email,
      registered_financial_year: this.regYearId,
      affiliation: this.universityId,
      district: this.districtId
    };
    this.collegeService.addCollege(college);
    this.added = true;
    form.reset();
  }

  onSelectRegYear(event) {
    this.regYearId = event.target['value'];
  }

  onSelectUniversity(event) {
    this.universityId = event.target['value'];
  }

  onSelectDistrict(event) {
    this.districtId = event.target['value'];
  }
}
