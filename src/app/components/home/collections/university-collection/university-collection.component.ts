import { Component, OnInit, OnDestroy } from '@angular/core';
import { University } from '../../masters/university/university.model';
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
import { UniversityService } from '../../masters/university/university.service';
import { College } from '../../masters/college/college.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-university-collection',
  templateUrl: './university-collection.component.html',
  styleUrls: ['./university-collection.component.css']
})
export class UniversityCollectionComponent implements OnInit, OnDestroy {

  collegeId = null;
  universityId = null;
  fromAcYearId = null;
  toAcYearId = null;
  fromFnYearId = null;
  toFnYearId = null;

  college: College[] = [];
  private collegeSub: Subscription;

  university: University[] = [];
  private universitySub: Subscription;

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
    public universityService: UniversityService,
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
    this.universityService.getUniversity();
    this.universitySub = this.universityService.getUniversityUpdatedListener()
      .subscribe((dist) => {
        this.university = dist;
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
    this.universityId = form.value.univ;
    this.fromAcYearId = form.value.from_ac;
    this.toAcYearId = form.value.to_ac;
    this.fromFnYearId = form.value.from_fin;
    this.toFnYearId = form.value.to_fin;

    this.collectionService.generateUniversityCollection(
      this.universityId, this.fromAcYearId, this.toAcYearId, this.fromFnYearId, this.toFnYearId
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
      .then(() => this.router.navigate(['collections/university-collection']));
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
    if (this.universitySub) {
      this.universitySub.unsubscribe();
    }
    if (this.collectionSub) {
      this.collectionSub.unsubscribe();
    }
  }
}
