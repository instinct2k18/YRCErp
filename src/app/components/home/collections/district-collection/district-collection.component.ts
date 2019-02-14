import { Component, OnInit, OnDestroy } from '@angular/core';
import { District } from '../../masters/district/district.model';
import { Subscription } from 'rxjs';
import { FinancialYear } from '../../masters/financial-year/financial-year.model';
import { AcademicYear } from '../../masters/academic-year/academic-year.model';
import { IncomeHeads } from '../../masters/income-heads/income-heads.model';
import { Collections } from '../collections.model';
import { CollegeService } from '../../masters/college/college.service';
import { FinancialYearService } from '../../masters/financial-year/financial-year.service';
import { AcademicYearService } from '../../masters/academic-year/academic-year.service';
import { CollectionsService } from '../collections.service';
import { IncomeHeadsService } from '../../masters/income-heads/income-heads.service';
import { ExcelService } from '../excel.service';
import { DistrictService } from '../../masters/district/district.service';
import { College } from '../../masters/college/college.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-district-collection',
  templateUrl: './district-collection.component.html',
  styleUrls: ['./district-collection.component.css']
})
export class DistrictCollectionComponent implements OnInit, OnDestroy {

  collegeId = null;
  districtId = null;
  fromAcYearId = null;
  toAcYearId = null;
  fromFnYearId = null;
  toFnYearId = null;

  college: College[] = [];
  private collegeSub: Subscription;

  district: District[] = [];
  private districtSub: Subscription;

  finYear: FinancialYear[] = [];
  private finYearSub: Subscription;

  acYear: AcademicYear[] = [];
  private acYearSub: Subscription;

  incHead: IncomeHeads[] = [];
  private incHeadSub: Subscription;

  collection: Collections[] = [];
  private collectionSub: Subscription;

  constructor(
    public collegeService: CollegeService,
    public districtService: DistrictService,
    public finYearService: FinancialYearService,
    public acYearService: AcademicYearService,
    public collectionService: CollectionsService,
    public incHeadService: IncomeHeadsService,
    private excelService: ExcelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.collegeService.getCollege();
    this.collegeSub = this.collegeService.getCollegeUpdatedListener()
      .subscribe((clg) => {
        this.college = clg;
      });
    this.districtService.getDistrict();
    this.districtSub = this.districtService.getDistrictUpdatedListener()
      .subscribe((dist) => {
        this.district = dist;
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

  onGenerateCollection(form: NgForm) {
    this.districtId = form.value.dist;
    this.fromAcYearId = form.value.from_ac;
    this.toAcYearId = form.value.to_ac;
    this.fromFnYearId = form.value.from_fin;
    this.toFnYearId = form.value.to_fin;

    this.collectionService.generateDistrictCollection(
      this.districtId, this.fromAcYearId, this.toAcYearId, this.fromFnYearId, this.toFnYearId
    );
    this.collectionSub = this.collectionService.getCollectionsUpdatedListener()
      .subscribe((coll) => {
        this.collection = coll;
        this.updateCollection(this.collection);
        this.excelService.exportAsExcelFile(this.collection, 'test');
      });
      // this.reset();
  }

  reset() {
    this.router.navigateByUrl('collections', {skipLocationChange: true})
      .then(() => this.router.navigate(['collections/district-collection']));
  }

  updateCollection(coll) {
    return coll.map((c) => {
        this.college.forEach((clg) => {
          if (clg.id === c.college_name) {
            c.college_name = clg.college_name;
          }
        });
        this.incHead.forEach((iH) => {
          if (iH.id === c.income_head) {
            c.income_head = iH.income_head;
          }
        });
        this.acYear.forEach((aY) => {
          if (aY.id === c.ac_year) {
            c.ac_year = aY.year;
          }
        });
        this.finYear.forEach((fY) => {
          if (fY.id === c.fn_year) {
            c.fn_year = fY.year;
          }
        });
    });
  }

  ngOnDestroy() {
    if (this.collegeSub) {
      this.collegeSub.unsubscribe();
    }
    if (this.acYearSub) {
      this.acYearSub.unsubscribe();
    }
    if (this.finYearSub) {
      this.finYearSub.unsubscribe();
    }
    if (this.incHeadSub) {
      this.incHeadSub.unsubscribe();
    }
    if (this.districtSub) {
      this.districtSub.unsubscribe();
    }
    if (this.collectionSub) {
      this.collectionSub.unsubscribe();
    }
  }
}
