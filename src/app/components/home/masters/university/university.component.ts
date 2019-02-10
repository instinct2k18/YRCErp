import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { University } from './university.model';
import { UniversityService } from './university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {

  added = false;

  constructor(public universityService: UniversityService) { }

  ngOnInit() {
  }

  onAddUniversity(form: NgForm) {
    const university: University = {
      id: null,
      university: form.value.university,
      address: form.value.address,
      nodal_officer: form.value.nodal_officer,
      contact_no: form.value.u_contact_no,
      email: form.value.u_email
    };
    this.universityService.addUniversity(university);
    this.added = true;
    form.reset();
  }
}
