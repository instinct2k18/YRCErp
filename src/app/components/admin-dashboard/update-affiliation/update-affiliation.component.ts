import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollegeService } from '../../home/masters/college/college.service';
import { Subscription } from 'rxjs';
import { College } from '../../home/masters/college/college.model';
import { UniversityService } from '../../home/masters/university/university.service';
import { University } from '../../home/masters/university/university.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;
@Component({
  selector: 'app-update-affiliation',
  templateUrl: './update-affiliation.component.html',
  styleUrls: ['./update-affiliation.component.css']
})
export class UpdateAffiliationComponent implements OnInit, OnDestroy {

  collegeId = null;
  currentUniName = null;
  currentUniId = null;
  universityId = null;

  clgFlag = false;

  college: College[] = [];
  private collegeSub: Subscription;

  university: University[] = [];
  private universitySub: Subscription;

  constructor(
    public collegeService: CollegeService,
    public universityService: UniversityService,
    private http: HttpClient,
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
      .subscribe((university) => {
        this.university = university;
      });
  }

  onSelectCollege(event, uni: HTMLInputElement) {
    this.collegeId = event.target['value'];
    this.college.forEach((c) => {
      if (c.id === this.collegeId) {
        this.currentUniId = c.affiliation;
      }
    });
    this.university.forEach((u) => {
      if (u.id === this.currentUniId) {
        this.currentUniName = u.university;
      }
    });
    this.clgFlag = true;
    uni.parentElement.style.display = 'block';
    uni.value = this.currentUniName;
  }

  onSelectUniversity(event) {
    this.universityId = event.target['value'];
  }

  onUpdateAffiliation(form: NgForm) {
    const url = BACKEND_URL + '/update-affiliation?' +
    'clgId=' + this.collegeId + '&old_affId=' + this.currentUniId + '&new_affId=' + this.universityId;
    this.http.get<{message: string}>(url)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
    this.reset();
  }
  reset() {
    this.router.navigateByUrl('/admin/dashboard', {skipLocationChange: true})
      .then(() => this.router.navigate(['/admin/dashboard/update-affiliation']));
  }
  ngOnDestroy() {
    if (this.collegeSub) {
      this.collegeSub.unsubscribe();
    }
    if (this.universitySub) {
      this.universitySub.unsubscribe();
    }
  }
}
