import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FinancialYear } from './../../../home/masters/financial-year/financial-year.model';
import { University } from './../../../home/masters/university/university.model';
import { District } from './../../../home/masters/district/district.model';
import { Subscription } from 'rxjs';
import { CollegeService } from './../../../home/masters/college/college.service';
import { FinancialYearService } from './../../../home/masters/financial-year/financial-year.service';
import { UniversityService } from 'src/app/components/home/masters/university/university.service';
import { DistrictService } from './../../../home/masters/district/district.service';
import { College } from './../../../home/masters/college/college.model';

@Component({
  selector: 'app-college-edit',
  templateUrl: './college-edit.component.html',
  styleUrls: ['./college-edit.component.css']
})
export class CollegeEditComponent implements OnInit, OnDestroy {

  yrcRegNoField = null;
  clgNameField = null;
  addrField = null;
  pgmOfficerField = null;
  contactNoField = null;
  emailField = null;
  regFinYearField = null;
  affialationField = null;
  districtField = null;
  regFinYearIdField = null;
  affialationIdField = null;
  districtIdField = null;

  collegeId = null;
  updated = false;
  regYearId = null;
  universityId = null;
  districtId = null;

  college: College[] = [];
  private collegeSub: Subscription;

  finYear: FinancialYear[] = [];
  private finYearSub: Subscription;

  university: University[] = [];
  private universitySub: Subscription;

  district: District[] = [];
  private districtSub: Subscription;

  constructor(
    public collegeService: CollegeService,
    public finYearService: FinancialYearService,
    public universityService: UniversityService,
    public districtService: DistrictService,
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

  onUpdateCollege(form: NgForm) {
    const college: College = {
      id: form.value.v_clg_name,
      yrc_reg_no: form.value.yrc_reg_no,
      college_name: form.value.college_name,
      address: form.value.c_address,
      program_officer: form.value.program_officer,
      contact_no: form.value.c_contact_no,
      email: form.value.c_email,
      registered_financial_year: form.value.reg_fin_year,
      affiliation: form.value.affiliation,
      district: form.value.district
    };
    this.collegeService.updateCollege(college);
    this.updated = true;
    form.reset();
  }

  onSelectCollege(event) {
    this.collegeId = event.target['value'];
    this.college.forEach(clg => {
      if (this.collegeId === clg.id) {
        this.yrcRegNoField = clg.yrc_reg_no;
        this.clgNameField = clg.college_name;
        this.addrField = clg.address;
        this.pgmOfficerField = clg.program_officer;
        this.contactNoField = clg.contact_no;
        this.emailField = clg.email;
        this.regFinYearIdField = clg.registered_financial_year;
        this.affialationIdField = clg.affiliation;
        this.districtIdField = clg.district;
      }
    });
    this.finYear.forEach(fin => {
      if (this.regFinYearIdField === fin.id) {
        this.regFinYearField = fin.year;
      }
    });
    this.university.forEach(uni => {
      if (this.affialationIdField === uni.id) {
        this.affialationField = uni.university;
      }
    });
    this.district.forEach(dist => {
      if (this.districtIdField === dist.id) {
        this.districtField = dist.district_name;
      }
    });
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

  ngOnDestroy() {
    if (this.collegeSub) {
      this.collegeSub.unsubscribe();
    }
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
}
