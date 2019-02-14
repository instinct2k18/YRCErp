import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
    ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    if(username === 'admin' && password === 'admin') {
      this.router.navigate(['admin/dashboard']);
    }
    }
  }

