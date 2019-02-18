import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AcademicYear } from './../../../home/masters/academic-year/academic-year.model';
import { AcademicYearService } from './../../../home/masters/academic-year/academic-year.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-academic-year-delete',
  templateUrl: './academic-year-delete.component.html',
  styleUrls: ['./academic-year-delete.component.css']
})
export class AcademicYearDeleteComponent implements OnInit, OnDestroy {

  deleted = false;
  acYearId = null;
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
  }

  onDeleteAcademicYear(form: NgForm) {
    this.academicYearService.deleteAcademicYear(this.acYearId);
    this.deleted = true;
    form.reset();
  }

  ngOnDestroy() {
    if (this.acYearSub) {
      this.acYearSub.unsubscribe();
    }
  }

}
