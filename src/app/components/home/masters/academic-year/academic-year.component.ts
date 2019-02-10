import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AcademicYear } from './academic-year.model';
import { AcademicYearService } from './academic-year.service';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent implements OnInit {

  added = false;

  constructor(public academicYearService: AcademicYearService) {  }

  ngOnInit() {
  }

  onAddAcademicYear(form: NgForm) {
    const academicYear: AcademicYear = { id: null, year: form.value.academic_year };
    this.academicYearService.addAcademicYear(academicYear);
    this.added = true;
    form.reset();
  }
}
