import { Component, OnInit, OnDestroy } from '@angular/core';
import { AcademicYearService } from './../../../home/masters/academic-year/academic-year.service';
import { Subscription } from 'rxjs';
import { AcademicYear } from './../../../home/masters/academic-year/academic-year.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-academic-year-edit',
  templateUrl: './academic-year-edit.component.html',
  styleUrls: ['./academic-year-edit.component.css']
})
export class AcademicYearEditComponent implements OnInit, OnDestroy {

  updated = false;

  acYearId = null;

  acYearFieldValue = null;

  acYear: AcademicYear[] = [];
  private acYearSub: Subscription;

  constructor(
    public academicYearService: AcademicYearService
  ) { }

  ngOnInit() {
    this.academicYearService.getAcademicYear();
    this.acYearSub = this.academicYearService.getAcademicYearUpdatedListener()
      .subscribe((acYear) => {
        this.acYear = acYear;
      });
  }

  onSelectAcYear(event) {
    this.acYearId = event.target['value'];
    this.acYear.forEach(a => {
      if (this.acYearId === a.id) {
        this.acYearFieldValue = a.year;
      }
    });
  }

  onUpdateAcademicYear(form: NgForm) {
    const academicYear: AcademicYear = { id: this.acYearId, year: form.value.academic_year };
    this.academicYearService.updateAcademicYear(academicYear);
    this.updated = true;
    form.reset();
  }

  ngOnDestroy() {
    if (this.acYearSub) {
      this.acYearSub.unsubscribe();
    }
  }

}
