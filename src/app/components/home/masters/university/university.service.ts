import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { University } from './university.model';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private university: University[] = [];
  private universitySubject = new Subject<University[]>();

  constructor(private http: HttpClient) { }

  getUniversity() {
    this.http.get<{message: String; university: any}>('http://localhost:3000/api/university')
      .pipe(map((universityData) => {
        return universityData.university.map(university => {
          return {
            id: university._id,
            university: university.university,
            address: university.address,
            nodal_officer: university.nodal_officer,
            contact_no: university.contact_no,
            email: university.email
          };
        });
      }))
      .subscribe( university => {
        this.university = university;
        this.universitySubject.next([...this.university]);
      });
  }

  getUniversityUpdatedListener() {
    return this.universitySubject.asObservable();
  }

  addUniversity(university: University) {
    this.university.push(university);
    this.universitySubject.next([...this.university]);
    this.http.post<{message: String}>('http://localhost:3000/api/university', university)
      .subscribe((resposnseData) => {
        console.log(resposnseData.message);
      });
  }
}
